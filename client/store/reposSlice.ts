import { createSlice } from '@reduxjs/toolkit'
import axios from '~/lib/axios'
import { generateFormData } from '~/utils/helpers'

export const reposType = {
    "data": [
        {
            "id": 0,
            "name": "",
            "full_name": "",
            "html_url": "",
            "language": "",
            "updated_at": "",
            "pushed_at": "",
            "stargazers_count": 0,
        }
    ],
    "links": {
        "first": "",
        "last": "",
        "prev": "",
        "next": ""
    },
    "meta": {
        "current_page": 0,
        "from": 0,
        "last_page": 0,
        "links": [
            {
                "url": null,
                "label": null,
                "active": false
            },
        ],
        "path": "",
        "per_page": 0,
        "to": 0,
        "total": 0
    },
    isLoading: false
}

const initialState: typeof reposType = {
    data: [],
    links: undefined,
    meta: undefined,
    isLoading: false
}

export const repos = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setRepos: (state, action) => {
            if (!action.payload.fresh) {
                const repos = [...(state.data || []), ...(action.payload?.repos?.data)];
                state.data = repos.reduce(function (RRepos: typeof reposType.data, repo) {
                    if (!RRepos.some(p => p?.id == repo.id)) RRepos.push(repo)
                    return RRepos;
                }, [])
            }
            else state.data = action.payload?.repos?.data
            state.links = action.payload.repos?.links
            state.meta = action.payload.repos?.meta
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})
export const { setRepos, setIsLoading } = repos.actions

export const fetchRepos = (params?: any) => async (dispatch) => {
    await dispatch(setIsLoading(true))
    const response = await axios.get(`api/repos`, { params });
    await dispatch(setRepos({ repos: response.data, fresh: params?.fresh }));
    await dispatch(setIsLoading(false))
};

// Action creators are generated for each case reducer function
export default repos.reducer