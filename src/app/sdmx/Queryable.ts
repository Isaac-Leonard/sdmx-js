module sdmx {
    interface Queryable {
        getRegistry(): Registry;
        getRepository(): Repository;
    }
}