import axiosNoteInstance from "../utils/axiosNoteInstance"

export const createNoteService = async ({ title, content }) => {
    const res = await axiosNoteInstance.post('/', { title, content })
    return res.data.data;
}

export const getNoteByIdService = async (id) => {
    const res = await axiosNoteInstance.get(`/${id}`)
    return res.data.data
}

export const updateNoteService = async (id, data) => {
    const res = await axiosNoteInstance.patch(`/${id}/update`, data)
    return res.data.data
}

export const SoftDeleteNoteService = async (id) => {
    const res = await axiosNoteInstance.patch(`/${id}/soft-delete`)
    return res.data.data
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
        sortBy = "created_at",
        order = "DESC",
        category,
        is_pinned,
    } = filters;
    const params = {
        sortBy,
        order,
        category,
        is_pinned: typeof is_pinned === "boolean" ? String(is_pinned) : undefined,
    };
    const res = await axiosNoteInstance.get('/', { params });
    return res.data.data;
}

export const getAllDeletedFilteredSortedNotesService = async (filters = {}) => {
    const {
        sortBy = "deleted_at",
        order = "DESC",
        category,
        is_pinned,
        is_deleted = true,
        is_archived = false,
    } = filters
    const params = {
        sortBy,
        order,
        category,
        is_pinned: typeof is_pinned === "boolean" ? String(is_pinned) : undefined,
        is_deleted,
        is_archived,
    }

    const res = await axiosNoteInstance.get('/bin', { params });
    return res.data.data
}

export const getAllArchivedFilteredSortedNotesService = async (filters = {}) => {
    const {
        sortBy = "updated_at",
        order = "DESC",
        category,
        is_pinned,
        is_deleted = false,
        is_archived = true,
    } = filters

    const params = {
        sortBy,
        order,
        category,
        is_pinned: typeof is_pinned === "boolean" ? String(is_pinned) : undefined,
        is_deleted,
        is_archived,
    }

    const res = await axiosNoteInstance.get('/archive', { params });
    return res.data.data
}

export const createCategoryService = async (name) => {
    const res = await axiosNoteInstance.post('/category', { name });
    return res.data.data;
}

export const updateCategoryService = async (id, name) => {
    const res = await axiosNoteInstance.patch(`/${id}/category`, { name });
    return res.data.data;
}

export const getAllActiveCategoriesService = async () => {
    const res = await axiosNoteInstance.get('/active-categories');
    return res.data.data;
}

export const updateNoteColorAndShadeService = async (id, data) => {
    const res = await axiosNoteInstance.patch(`/${id}/update-color-shade`, data );
    console.log(res.data.data)
    return res.data.data;
}

