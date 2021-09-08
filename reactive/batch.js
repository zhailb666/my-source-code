/*
 * @Author: your name
 * @Date: 2021-09-08 22:04:00
 * @Description: file content
 */
import { batchStart, batchEnd, batchScopeStart, batchScopeEnd, } from './reaction.js';
import { createBoundaryAnnotation } from './internals.js';
export var batch = createBoundaryAnnotation(batchStart, batchEnd);
batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd);
//# sourceMappingURL=batch.js.map