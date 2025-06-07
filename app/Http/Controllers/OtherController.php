<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OtherController extends Controller
{
    public function index()
    {
        return Inertia::render('others/index');
    }
}
