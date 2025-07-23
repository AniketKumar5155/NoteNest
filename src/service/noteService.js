import axiosNoteInstance from "../utils/axiosNoteInstance"

export const createNoteService = async ({ title, content }) => {
    const res = await axiosNoteInstance.post('/', { title, content })
    return res.data.data;
}

export const getAllNotesService = async () => {
    const res = await axiosNoteInstance.get('/');
    return res.data.data;
}

export const getNoteByIdService = async (id) => {
    const res = await axiosNoteInstance.get(`/${id}`)
    return res.data.data
}

export const updateNoteService = async (id, data) => {
    const res = await axiosNoteInstance.patch(`/${id}`, data)
    return res.data.data
}

export const SoftDeleteNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/soft-delete`)
    return res.data.data
}

export const getAllArchivedNotesService = async () => {
    const res = await axiosNoteInstance.get(`/archive`)
    return res.data.data;
}

export const getAllSoftDeletedNotesService = async () => {
    const res = await axiosNoteInstance.get(`/bin`)
    return res.data.data;
}

export const restoreSoftDeletedNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/restore`)
    return res.data.data;
}

export const archiveNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/archive`)
    return res.data.data;
}   

export const unarchiveNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/unarchive`)
    return res.data.data;
}


export const deleteNoteService = async (id) => {
    const res = await axiosNoteInstance.delete(`/${id}/hard-delete`)
    return res.data.data;
}

export const restoreDeletedNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/restore`)
    return res.data.data;
}

export const getFilteredSortedNotesService = async (filters = {}) => {
    const {
        sortBy = "created_at", // match backend default
        order = "DESC",        // match backend default
        category,
        is_pinned,
    } = filters;
    const params = {
        sortBy,
        order,
        category,
        is_pinned: typeof is_pinned === "boolean" ? String(is_pinned) : undefined,
    };
    const res = await axiosNoteInstance.get('/filter', { params });
    return res.data.data;
}
