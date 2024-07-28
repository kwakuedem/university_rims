<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // // Check if the user is authenticated
        // if (!Auth::check()) {
        //     return redirect('/login');
        // }

        // // Check if the user has the specified role
        // if (!$request->user()->hasRole($role)) {
        //     abort(403, 'Unauthorized');
        // }

        return $next($request);
    }
}
