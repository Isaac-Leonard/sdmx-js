module sdmx {
    export interface Repository {
        query(query: sdmx.message.DataQuery): sdmx.message.DataMessageType;
        query(flow: sdmx.structure.dataflow.Dataflow, query: string): sdmx.message.DataMessageType;
    }
}