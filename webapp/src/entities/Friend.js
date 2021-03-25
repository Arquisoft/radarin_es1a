class Friend {
    constructor(webId, name, photo) {
        this.webId = webId;
        this.name = name;
        this.photo = photo;
    }

    getWebId() {
        return this.webId;
    }

    getName() {
        return this.name;
    }

    getPhoto() {
        return this.photo;
    }

    toString(){
        return "Usuario: "+this.webId+" con Nombre: "+this.getName();
    }
    toJson() {
        return JSON.stringify(
            {
                "url": this.webId
            }
        );
    }
}

export default Friend;