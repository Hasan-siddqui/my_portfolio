<?php
$sourceDir = __DIR__ . '/img/'; // folder where existing images are stored
$converted = 0;

// Ensure GD library supports WebP
if (!function_exists('imagewebp')) {
    exit("GD library with WebP support is not available.");
}

$images = glob($sourceDir . "*.{jpg,jpeg,png,JPG,JPEG,PNG}", GLOB_BRACE);

foreach ($images as $imagePath) {
    $ext = pathinfo($imagePath, PATHINFO_EXTENSION);
    $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $imagePath);

    if (file_exists($webpPath)) {
        echo "Already converted: " . basename($webpPath) . "<br>";
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
            echo "Unsupported file type: $ext<br>";
            continue 2;
    }

    if ($image) {
        if (imagewebp($image, $webpPath, 80)) {
            echo "Converted to WebP: " . basename($webpPath) . "<br>";
            $converted++;
        } else {
            echo "❌ Failed to convert: " . basename($imagePath) . "<br>";
        }
        imagedestroy($image);
    }
}

echo "<br><strong>Total Converted:</strong> $converted";
?>
