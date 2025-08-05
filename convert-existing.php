<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$sourceDir = __DIR__ . '/img/';
$converted = 0;

if (!function_exists('imagewebp')) {
    exit("❌ GD library with WebP support is not available.");
}

$images = glob($sourceDir . "*.{jpg,jpeg,png,JPG,JPEG,PNG}", GLOB_BRACE);

if (empty($images)) {
    exit("❌ No matching images found in /img.");
}

foreach ($images as $imagePath) {
    $ext = pathinfo($imagePath, PATHINFO_EXTENSION);
    $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $imagePath);

    if (file_exists($webpPath)) {
        echo "✔ Already converted: " . basename($webpPath) . "<br>";
        continue;
    }

    switch (strtolower($ext)) {
        case 'jpg':
        case 'jpeg':
            $image = imagecreatefromjpeg($imagePath);
            break;
        case 'png':
            $image = imagecreatefrompng($imagePath);
            break;
        default:
            echo "❌ Unsupported file type: $ext<br>";
            continue 2;
    }

    if ($image) {
        if (imagewebp($image, $webpPath, 80)) {
            echo "✅ Converted: " . basename($imagePath) . " → " . basename($webpPath) . "<br>";
            imagedestroy($image);
            $converted++;
        } else {
            echo "❌ Failed to convert: " . basename($imagePath) . "<br>";
        }
    }
}

echo "<hr><strong>Total converted:</strong> $converted";
