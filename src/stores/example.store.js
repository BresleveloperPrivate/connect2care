// import { observable, decorate, action } from 'mobx';
import { observable, decorate } from 'mobx';


class ExampleStore{
    first = "hello";
}

decorate(ExampleStore,{first:observable});

export default new ExampleStore();

