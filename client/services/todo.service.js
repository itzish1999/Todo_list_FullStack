import http from '../http-common';

class TodoListDataService {
    getAll() {
        return http.get("/TodoList");
    }
    get(id) {
        return http.get(`/TodoList/${id}`);
    }
    create(data) {
        return http.post("/TodoList", data);
    }
    update(id, data) {
        return http.put(`/TodoList/${id}`, data);
    }
    delete(id) {
        return http.delete(`/TodoList/${id}`);
    }
    deleteAll() {
        return http.delete(`/TodoList`);
    }
    findByTask(task) {
        return http.get(`TodoList?title=${task}`);
    }
};

export default new TodoListDataService();