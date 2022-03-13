export {}
declare global {
    interface globalFunc{
        add: () => any
    }
    interface JqueryInstance {
         html: (html: string) => JqueryInstance
    }
    // 函数重载
    declare function $(readyFunc: () => void): void;// 定义全局函数 $可以接收一个函数，函数重载
    declare function $(selector: string): JqueryInstance;// 定义全局函数 $可以接收一个字符串，函数重载
    // 如何对对象进行定义，以及对类进行类型定义，以及命名空间的嵌套
    declare namespace $ { // $.fn.init
        namespace fn{
            class init{}
        }
    }
}

