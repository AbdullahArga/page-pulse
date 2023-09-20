<?php

namespace App\Http\Services;

class ImageService
{
    public function create($request, $filed = 'image', $folder = 'images')
    {
        if ($image = $request->file($filed)) {
            $destinationPath = $folder;
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            return $profileImage;
        }
        return null;
    }
    public function isChanged($current, $new)
    {
        return $current == $new;
    }
    public function update($request, $filed = 'image', $folder = 'images', $old)
    {
    }
    public function delete($image_path)
    {
        if (file_exists($image_path)) {

            @unlink($image_path);
        }
    }
}
