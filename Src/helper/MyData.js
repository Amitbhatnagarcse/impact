
export default class MyData {
    static sharedInstance =
        MyData.sharedInstance == null
            ? new MyData()
            : this.sharedInstance;

    static token = '';
    static mobile = '';

    constructor(item) {
        MyData.token = item;
    }

}
