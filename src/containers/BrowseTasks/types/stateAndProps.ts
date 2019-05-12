import {TaskStatus,IReview} from '../../../types/data'
export interface ITaskList {
    taskList:ITaskDetail[],
}
export interface ITaskMeta{
    hasNext?: boolean;
    searchAfterId?: string;
    searchBeforeId?: string;
    newTasksCount?:number;
    total?:number;
}
export interface IFetchStatus {
    isInitDataLoading:boolean,
    isInitDataLoaded:boolean,
    isNewDataLoading:boolean,
    isNewDataLoaded:boolean,
    isMoreDataLoading:boolean,
    isMoreDataLoaded:boolean
}
export interface ITaskDetail {
    _id: string 
    poster: string 
    posterId: string 
    postedTime: string 
    price: string
    what: string 
    where: string 
    when: string 
    status: TaskStatus 
    tasker: string  | null
    taskerId: string | null
    assignedTime: string | null
    completedTime: string | null
    reviews: IReview
  }
export interface IFetchTaskResult {
    data:{
        meta: ITaskMeta;
        tasks: ITaskDetail[];
    }
    message?:string;
}
export interface IBrowseTask{
    taskList: ITaskDetail[],
    newTaskList: ITaskDetail[],
    hasNext:boolean,
    searchAfterId: string,
    searchBeforeId: string,
    newTaskCount:number,
    totalTaskCount:number,
}
export interface IRouteProps {
    match: {
        params: {
            id: string
        }
    }
    history: {}
    location: {
        pathname: string
    }
}