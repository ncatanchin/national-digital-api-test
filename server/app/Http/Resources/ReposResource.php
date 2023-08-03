<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReposResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request): array
    {
        // return $this->resource;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'full_name' => $this->full_name,
            'html_url' => $this->html_url,
            'language' => $this->language,
            'updated_at' => $this->updated_at,
            'pushed_at' => $this->pushed_at,
            'stargazers_count' => $this->stargazers_count,
        ];
    }
}
