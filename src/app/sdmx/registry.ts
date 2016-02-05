/// <amd-module name='sdmx/registry'/>
///<reference path="../collections.ts"/>
import structure = require("sdmx/structure");
import interfaces = require("sdmx/interfaces");
import commonreferences = require("sdmx/commonreferences");
import message = require("sdmx/message");
export class LocalRegistry implements interfaces.Registry {
    private structures: Array<message.StructureType> = [];
    // Registry
    listDataflows(): Array<structure.Dataflow> {
        var dataflowList: Array<structure.Dataflow> = [];
        for (var i = 0; i < this.structures.length; i++) {
            if (this.structures[i].listDataflows().length > 0) {
                collections.arrays.forEach(this.structures[i].listDataflows(), function(e: structure.Dataflow): void {
                    dataflowList.push(e);
                });
            }
        }
        return dataflowList;
    }
    clear(): void {
        this.structures = [];
    }
    load(struct: message.StructureType): void {
        this.structures.push(struct);
    }
    unload(struct: message.StructureType): void {
        collections.arrays.remove(this.structures, struct);
    }
    findDataStructure(ref: commonreferences.Reference): structure.DataStructure {
        return null;
    }
    findDataflow(ref: commonreferences.Reference): structure.Dataflow {
        return null;
    }
    findCode(ref: commonreferences.Reference): structure.CodeType {
        return null;
    }
    findCodelist(ref: commonreferences.Reference): structure.Codelist {
        return null;
    }
    findItemType(item: commonreferences.Reference): structure.ItemType {
        return null;
    }
    findConcept(ref: commonreferences.Reference): structure.ConceptType {
        return null;
    }
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType {
        return null;
    }
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure> {
        return null;
    }
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow> {
        return null;
    }
    searchCodelist(ref: commonreferences.Reference): Array<structure.Codelist> {
        return null;
    }
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType> {
        return null;
    }
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType> {
        return null;
    }
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType> {
        return null;
    }
    save(): any { }
}
export class DoubleRegistry implements interfaces.Registry{
    private left:interfaces.Registry=null;
    private right:interfaces.Registry=null;
    constructor(left:interfaces.Registry,right:interfaces.Registry) {
        this.left=left;
        this.right=right;
    }
    // Registry
    listDataflows(): Array<structure.Dataflow> {
        var dataflowList: Array<structure.Dataflow> = [];
        collections.arrays.forEach(this.left.listDataflows(),function(a){
            dataflowList.push(a);
        })
        collections.arrays.forEach(this.right.listDataflows(),function(a){
            dataflowList.push(a);
        })
        return dataflowList;
    }
    clear(): void {
    }
    load(struct: message.StructureType): void {
    }
    unload(struct: message.StructureType): void {
    }
    findDataStructure(ref: commonreferences.Reference): structure.DataStructure {
        if (this.left.findDataStructure(ref)!=null) {
            return this.left.findDataStructure(ref);
        }else {
            return this.right.findDataStructure(ref);
        }
    }
    findDataflow(ref: commonreferences.Reference): structure.Dataflow {
        if (this.left.findDataflow(ref)!=null) {
            return this.left.findDataflow(ref);
        }else {
            return this.right.findDataflow(ref);
        }
    }
    findCode(ref: commonreferences.Reference): structure.CodeType {
        if (this.left.findCode(ref)!=null) {
            return this.left.findCode(ref);
        }else {
            return this.right.findCode(ref);
        }
    }
    findCodelist(ref: commonreferences.Reference): structure.Codelist {
        if (this.left.findCodelist(ref)!=null) {
            return this.left.findCodelist(ref);
        }else {
            return this.right.findCodelist(ref);
        }
    }
    findItemType(item: commonreferences.Reference): structure.ItemType {
        if (this.left.findItemType(item)!=null) {
            return this.left.findItemType(item);
        }else {
            return this.right.findItemType(item);
        }
    }
    findConcept(ref: commonreferences.Reference): structure.ConceptType {
        if (this.left.findConcept(ref)!=null) {
            return this.left.findConcept(ref);
        }else {
            return this.right.findConcept(ref);
        }
    }
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType {
        if (this.left.findConceptScheme(ref)!=null) {
            return this.left.findConceptScheme(ref);
        }else {
            return this.right.findConceptScheme(ref);
        }
    }
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure> {
        var list:Array<structure.DataStructure> = [];
        collections.arrays.forEach(this.left.searchDataStructure(ref),function(a){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchDataStructure(ref),function(a){
            list.push(a);
        })
        return list;
    }
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow> {
        var list: Array<structure.Dataflow> = [];
        collections.arrays.forEach(this.left.searchDataflow(ref),function(a:structure.Dataflow){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchDataflow(ref),function(a:structure.Dataflow){
            list.push(a);
        })
        return list;
    }
    searchCodelist(ref: commonreferences.Reference): Array<structure.Codelist> {
        var list: Array<structure.Codelist> = [];
        collections.arrays.forEach(this.left.searchCodelist(ref),function(a:structure.Codelist){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchCodelist(ref),function(a:structure.Codelist){
            list.push(a);
        })
        return list;
    }
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType> {
        var list: Array<structure.ItemType> = [];
        collections.arrays.forEach(this.left.searchItemType(item),function(a:structure.ItemType){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchItemType(item),function(a:structure.ItemType){
            list.push(a);
        })
        return list;
    }
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType> {
        var list: Array<structure.ConceptType> = [];
        collections.arrays.forEach(this.left.searchConcept(ref),function(a:structure.ConceptType){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchConcept(ref),function(a:structure.ConceptType){
            list.push(a);
        })
        return list;
    }
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType> {
        var list: Array<structure.ConceptSchemeType> = [];
        collections.arrays.forEach(this.left.searchConceptScheme(ref),function(a:structure.ConceptSchemeType){
            list.push(a);
        })
        collections.arrays.forEach(this.right.searchConceptScheme(ref),function(a:structure.ConceptSchemeType){
            list.push(a);
        })
        return list;
    }
    save(): any { }
}