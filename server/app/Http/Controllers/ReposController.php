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
        $searchTerm = $request->get('q')
            ? $request->get('q').' in:name'
            : '';

        $sortBy = json_decode($request->get('sort'));

        $allowedAccessors = [
            'name',
            'stargazers_count',
            'updated_at',
        ];

        $repos = $this->paginator->fetch(
            $this->client->search(),
            'repositories',
            [$searchTerm.' topic:php']
        );

        $totalResults = $repos['total_count'];

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

        if (in_array($sortBy->accessor, $allowedAccessors)) {
            $repos = $repos->sortBy($sortBy->accessor);
        }

        $repos = $repos->paginate(20)->withQueryString();

        return ReposResource::collection($repos);
    }
}
