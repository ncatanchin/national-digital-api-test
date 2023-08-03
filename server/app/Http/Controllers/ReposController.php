<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReposRequest;
use App\Http\Resources\ReposResource;
use Github\ResultPager;
use GrahamCampbell\GitHub\Facades\GitHub;
use GrahamCampbell\GitHub\GitHubManager;
use Illuminate\Http\Request;

class ReposController extends Controller
{
    protected $client;
    protected $paginator;

    public function __construct(GitHubManager $manager)
    {
        $this->client = $manager->connection();
        $this->paginator = new ResultPager($this->client);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTerm = $request->get('q') ?? '';

        $repos = $this->paginator->fetch($this->client->search(), 'repositories', [$searchTerm.' topic:php']);

        $repos = collect($repos['items'])
            ->map(function ($item) {
                $repoArray = collect($item)->only([
                    'id',
                    'name',
                    'full_name',
                    'html_url',
                    'language',
                    'updated_at',
                    'pushed_at',
                    'stargazers_count',
                ])->toArray();

                $model = new \App\Models\Repo();
                $model->fill($repoArray);

                return $model;
            });
        
        // dump($repos);
        // exit;

        return ReposResource::collection($repos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
