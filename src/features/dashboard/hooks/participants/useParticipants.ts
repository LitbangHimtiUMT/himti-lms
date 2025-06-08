import { useQuery } from "@tanstack/react-query"
import { participantService } from "../../../../core/services/participants"
import useDebounce from "../../../_global/hooks/useDebounce"

interface Query {
    path?: string
    search?: string
}

export const useParticipants = (query: Query) => {
    const {search} = query
    const searchQuery = useDebounce(search ?? '', 500)
    return useQuery({
        queryKey: ['participants', {
            path: query.path,
            search: searchQuery
        }],
        queryFn: () => {
            return participantService.getByClass({path: query.path, queryParams: {
                search: searchQuery
            }})
        }
    })
}