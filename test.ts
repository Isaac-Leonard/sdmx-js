class StructureType implements Registry {
	public struct:any;
	constructor(struct:any){
		this.struct = struct;
	}
	// Registry
	listDataflows(): DataflowType[]{

	}
	clear():void{

	}
	load(struct:StructureType):void{

	}
	unload(struct:StructureType):void{

	}
	findDataStructure(ref:Reference): DataStructureType{
		return null;
	}
	findDataflow(ref:DataflowReference): DataflowType{
        return null;
	}
	findCode(ref:CodeReference):CodeType{
		return null;
	}
	findCodelist(ref:CodelistReference): CodelistType{
        return null;
	}
	findItemType(item:ItemReference): ItemType{
        return null;
	}
	findConcept(ref:ConceptReference): ConceptType{
        return null;
	}
	findConcepScheme(ref:ConceptSchemeReference):ConceptSchemeType{
        return null;
	}
	save(): any{

	}

}
class ItemType{

}
class CodeType extends ItemType {

}
class ConceptType extends ItemType {

}
class ItemSchemeType {

}
class CodelistType extends ItemSchemeType {


}

class ConceptSchemeType extends ItemSchemeType {

}
class DataflowType{
    


}
class DataStructureType{

}

class Reference{
    
}
class Ref{

}


class DataQuery{

}
class DataMessageType{

}

interface Queryable {
	getRegistry():Registry;
	getRepository():Repository;
}
interface Registry {
	listDataflows(): DataflowType[];
	clear():void;
	load(struct:StructureType):void;
	unload(struct:StructureType):void;
	findDataStructure(ref:Reference): DataStructureType;
	findDataflow(ref:Reference): DataflowType;
	findCode(ref:Reference):CodeType;
	findCodelist(ref:Reference): CodelistType;
	findItemType(item:Reference): ItemType;
	findConcept(ref:Reference): ConceptType;
	findConceptScheme(ref:Reference):ConceptSchemeType;
	save(): any;
}

interface Repository {
	query(query:DataQuery): DataMessageType;
	query(query:string)
}
