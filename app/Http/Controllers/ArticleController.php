<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Services\ArticleService;
use App\Http\Services\ImageService;
use App\Policies\ArticlePolicy;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Gate;

class ArticleController extends Controller
{
    public $articleService = null;
    public $imageService = null;
    public function __construct()
    {
        $this->articleService = new ArticleService();
        $this->imageService = new ImageService();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::self()->with('user')->withCount('comments')->filter()->latest()->paginate(request()->input('limit', 6));
        return ArticleResource::collection($articles);
    }
    /**
     * Display a listing of the resource.
     */
    public function allActiveArticle()
    {
        $articles = Article::active()->with('user')->withCount('comments')->filter()->latest()->paginate(request()->input('limit', 6));
        return ArticleResource::collection($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {

        $user = auth('api')->user();
        if ($user && $user->hasPermission('add_article')) {
            $data = $request->all();

            \DB::transaction(function () use ($data, $request) {
                $this->articleService->store($data);
            });
            return response()->json(['success' => true]);
        } else {
            abort(403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {

        request()->merge(['with_content' => true]);
        return new ArticleResource($article);
    }
    /**
     * Display the specified resource.
     */
    public function view(Article $article)
    {
        Gate::authorize('is_active', $article);

        request()->merge(['with_content' => true]);
        $article
            ->loadCount('comments')
            ->load(['comments' => function ($query) {
                $query->orderByDesc('created_at');
                $query->with('user');
            }]);
        return new ArticleResource($article);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        request()->merge(['with_content' => true]);
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        Gate::authorize('update', $article);

        $data = $request->all();

        \DB::transaction(function () use ($data, $article, $request) {
            $this->articleService->update($data);
        });
        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->image) {
            $this->imageService->delete($article->image);
        }

        $article->delete();

        return response()->json(['success' => true]);
    }
    public function active(Article $article)
    {
        Gate::authorize('active', $article);
        $article->is_active = true;
        $article->save();
        return response()->json(['success' => true]);
    }
    public function inactive(Article $article)
    {
        Gate::authorize('active', $article);

        $article->is_active = false;
        $article->save();
        return response()->json(['success' => true]);
    }
}
