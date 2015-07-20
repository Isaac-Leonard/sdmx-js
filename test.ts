interface StructureType{

}
interface ItemType{

}
interface CodeType extends ItemType {

}
interface ConceptType extends ItemType {

}
interface ItemSchemeType {

}
interface CodelistType extends ItemSchemeType {


}

interface ConceptSchemeType extends ItemSchemeType {

}
interface DataflowType{
    


}
interface DataStructureType{

}

interface Reference{
    
}
interface Ref{

}
interface DataStructureReference extends Reference{

}
interface DataflowReference extends Reference{

}
interface CodeReference extends Reference{

}
interface CodelistReference extends Reference{

}
interface ItemReference extends Reference{

}
interface ConceptReference extends Reference{

}
interface ConceptSchemeReference extends Reference{

}

interface DataQuery{}
interface DataMessageType{}

interface Queryable {
	getRegistry():Registry;
	getRepository():Repository;
}
interface Registry {
	listDataflows(): DataflowType[];
	clear():void;
	load(struct:StructureType):void;
	unload(struct:StructureType):void;
	find(ref:DataStructureReference): DataStructureType;
	find(ref:DataflowReference): DataflowType;
	find(ref:CodeReference):CodeType;
	find(ref:CodelistReference): CodelistType;
	find(item:ItemReference): ItemType;
	find(ref:ConceptReference): ConceptType;
	find(ref:ConceptSchemeReference):ConceptSchemeType;
	save(): any;
}

interface Repository {
	query(query:DataQuery): DataMessageType;
	query(query:string)
}
