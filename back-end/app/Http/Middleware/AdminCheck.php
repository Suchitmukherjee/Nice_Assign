<?php


namespace App\Http\Middleware;

use Closure;

class AdminCheck
{
    public function handle($request, Closure $next)
    {
        // Check if the user is authenticated
        if (auth()->check()) {
            // Check if the authenticated user is an admin
            if (auth()->user()->is_admin) {
                return $next($request);
            }
        }

        // If not an admin, redirect or abort as needed
        abort(403, 'Unauthorized');
    }
}

