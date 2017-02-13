
## 通过流取到数据

 - 用`Readable`创建对象`readable`后，便得到了一个可读流。
 - 如果实现`_read`方法，就将流连接到一个底层数据源
 - 流通过调用`_read`向底层请求数据，底层再调用流的`push`方法将需要的数据传递过来
 - 当`readable`连接了数据源后，下游便可以调用`readable.read(n)`向流请求数据，同时监听`readable`的data事件来接收取到的数据。

![](http://tech.meituan.com/img/stream-how-data-comes-out.png) 

### read

`read`方法中的逻辑可用下图表示，后面几节将对该图中各环节加以说明。

![](http://tech.meituan.com/img/stream-read.png)


###push方法

消耗方调用`read(n)`促使流输出数据，而流通过`_read()`使底层调用`push`方法将数据传给流。

如果流在流动模式下（`state.flowing`为`true`）输出数据，数据会自发地通过`data`事件输出，不需要消耗方反复调用`read(n)`。

如果调用`push`方法时缓存为空，则当前数据即为下一个需要的数据。
这个数据可能先添加到缓存中，也可能直接输出。
执行`read`方法时，在调用`_read`后，如果从缓存中取到了数据，就以`data`事件输出。

所以，如果`_read`异步调用`push`时发现缓存为空，则意味着当前数据是下一个需要的数据，且不会被`read`方法输出，应当在`push`方法中立即以`data`事件输出。

因此，上图中“立即输出”的条件是：

    state.flowing && state.length === 0 && !state.sync
    
    
### end事件

由于流是分次向底层请求数据的，需要底层显示地告诉流数据是否取完。
所以，当某次（执行`_read()`）取数据时，调用了`push(null)`，就意味着底层数据取完。
此时，流会设置`state.ended`。

`state.length`表示缓存中当前的数据量。
**只有当`state.length`为0，且`state.ended`为`true`，才意味着所有的数据都被消耗了。**
一旦在执行`read(n)`时检测到这个条件，便会触发`end`事件。
当然，这个事件只会触发一次。


### readable事件

