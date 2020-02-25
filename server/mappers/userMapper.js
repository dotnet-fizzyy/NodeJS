export function mapToModel(req) {
    const user = {
        id: req.body._id,
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
    };

    return user;
}