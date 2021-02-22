
export default class MyData {
    static sharedInstance =
        MyData.sharedInstance == null
            ? new MyData()
            : this.sharedInstance;

    static token = '';
    static mobile = '';
    static screenName = '';

    constructor(item) {
        MyData.token = item;
    }

}
