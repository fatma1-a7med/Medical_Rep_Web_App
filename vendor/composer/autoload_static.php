<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbeb02b9c4b154a5247c9fcae7e00de64
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Faker\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Faker\\' => 
        array (
            0 => __DIR__ . '/..' . '/fzaninotto/faker/src/Faker',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbeb02b9c4b154a5247c9fcae7e00de64::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbeb02b9c4b154a5247c9fcae7e00de64::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbeb02b9c4b154a5247c9fcae7e00de64::$classMap;

        }, null, ClassLoader::class);
    }
}