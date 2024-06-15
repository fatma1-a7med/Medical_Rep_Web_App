<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitbeb02b9c4b154a5247c9fcae7e00de64
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitbeb02b9c4b154a5247c9fcae7e00de64', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitbeb02b9c4b154a5247c9fcae7e00de64', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitbeb02b9c4b154a5247c9fcae7e00de64::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
