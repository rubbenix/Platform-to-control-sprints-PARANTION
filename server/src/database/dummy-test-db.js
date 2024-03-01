/*Name character varying(255) NOT NULL,
    UserID integer DEFAULT null,
    Description character varying(255) DEFAULT null,
    Status character varying(255) DEFAULT null,
    CompletionDate date DEFAULT null,*/

export const tests = [
    {
        name : "Test1",
        description : "Very cool test",
        status : "To Do",
        completiondate : new Date().toDateString()
    },
    {
        name : "Test2",
        description : "Very cool test",
        status : "To Do",
        completiondate : new Date().toDateString()
    },
    {
        name : "Test3",
        description : "Very cool test",
        status : "To Do",
        completiondate : new Date().toDateString()
    },
];

/*StepNR integer,
    Title character varying(255) NOT NULL,
    Description character varying(255) DEFAULT null,
    TestLog character varying(255) DEFAULT null,
    weight integer NOT NULL,*/

export const steps = [
    {
        title : "Step1",
        description : "Very cool test",
        textlog : "done this and that",
        weight : 1
    },
    {
        title : "Step2",
        description : "Very cool test",
        textlog : "done this and that",
        weight : 1
    },
    {
        title : "Step1",
        description : "Very cool test",
        textlog : "done this and that",
        weight : 3
    }
];

/*Email character varying(255) NOT NULL,
    Role character varying(255) NOT NULL,
    Password character varying(255) NOT NULL,*/

export const users = [
    {
        email : "new@gmail.com",
        role : "admin",
        password : "123",
    },
    {
        email : "new@gmail.com",
        role : "developer",
        password : "123",
    },
    {
        email : "new@gmail.com",
        role : "tester",
        password : "123",
    }
];