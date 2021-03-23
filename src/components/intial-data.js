const initialData= {
    tasks:{
       
    },
    // The Tasks in a specific column
    columns:{
        'todo':{
            id:'todo',
            taskIds:[]
        },
        'doing':{
            id:'doing',
            taskIds:[]
        },
        'done':{
            id:'done',
            taskIds:[]
        }
    },
    // For Reordering of columns
    columnOrder:['todo','doing','done']
}

export default initialData;