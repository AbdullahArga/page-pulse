<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission): Response
    {


        $user = auth()->user();
        $permissions = explode('|', $permission);
        foreach ($permissions as $key => $permission) {
            if ($user->hasPermission($permission)) {

                return $next($request);
            }
        }


        abort(403, trans('message.you_dont_have_right_permission'));
    }
}
