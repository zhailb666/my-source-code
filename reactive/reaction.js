import { isFn } from './checkers.js';
import { ReactionStack, PendingScopeReactions, RawReactionsMap, PendingReactions, BatchCount, UntrackCount, BatchScope, ObserverListeners, } from './environment.js';
var ITERATION_KEY = Symbol('iteration key');
var addRawReactionsMap = function (target, key, reaction) {
    var reactionsMap = RawReactionsMap.get(target);
    if (reactionsMap) {
        var reactions = reactionsMap.get(key);
        if (reactions) {
            reactions.add(reaction);
        }
        else {
            reactionsMap.set(key, new Set([reaction]));
        }
        return reactionsMap;
    }
    else {
        var reactionsMap_1 = new Map([[key, new Set([reaction])]]);
        RawReactionsMap.set(target, reactionsMap_1);
        return reactionsMap_1;
    }
};
var addReactionsMapToReaction = function (reaction, reactionsMap) {
    var bindSet = reaction._reactionsSet;
    if (bindSet) {
        bindSet.add(reactionsMap);
    }
    else {
        reaction._reactionsSet = new Set([reactionsMap]);
    }
    return bindSet;
};
var getReactionsFromTargetKey = function (target, key) {
    var reactionsMap = RawReactionsMap.get(target);
    var reactions = [];
    if (reactionsMap) {
        var map = reactionsMap.get(key);
        if (map) {
            map.forEach(function (reaction) {
                if (reactions.indexOf(reaction) === -1) {
                    reactions.push(reaction);
                }
            });
        }
    }
    return reactions;
};
var runReactions = function (target, key) {
    var reactions = getReactionsFromTargetKey(target, key);
    var prevUntrackCount = UntrackCount.value;
    UntrackCount.value = 0;
    for (var i = 0, len = reactions.length; i < len; i++) {
        var reaction = reactions[i];
        if (reaction._isComputed) {
            reaction._scheduler(reaction);
        }
        else if (isScopeBatching()) {
            PendingScopeReactions.add(reaction);
        }
        else if (isBatching()) {
            PendingReactions.add(reaction);
        }
        else {
            if (isFn(reaction._scheduler)) {
                reaction._scheduler(reaction);
            }
            else {
                reaction();
            }
        }
    }
    UntrackCount.value = prevUntrackCount;
};
var notifyObservers = function (operation) {
    ObserverListeners.forEach(function (fn) { return fn(operation); });
};
export var bindTargetKeyWithCurrentReaction = function (operation) {
    var key = operation.key, type = operation.type, target = operation.target;
    if (type === 'iterate') {
        key = ITERATION_KEY;
    }
    var current = ReactionStack[ReactionStack.length - 1];
    if (isUntracking())
        return;
    if (current) {
        addReactionsMapToReaction(current, addRawReactionsMap(target, key, current));
    }
};
export var bindComputedReactions = function (reaction) {
    if (isFn(reaction)) {
        var current = ReactionStack[ReactionStack.length - 1];
        if (current) {
            var computes = current._computesSet;
            if (computes) {
                computes.add(reaction);
            }
            else {
                current._computesSet = new Set([reaction]);
            }
        }
    }
};
export var runReactionsFromTargetKey = function (operation) {
    var key = operation.key, type = operation.type, target = operation.target, oldTarget = operation.oldTarget;
    notifyObservers(operation);
    if (type === 'clear') {
        oldTarget.forEach(function (_, key) {
            runReactions(target, key);
        });
    }
    else {
        runReactions(target, key);
    }
    if (type === 'add' || type === 'delete' || type === 'clear') {
        var newKey = Array.isArray(target) ? 'length' : ITERATION_KEY;
        runReactions(target, newKey);
    }
};
export var hasRunningReaction = function () {
    return ReactionStack.length > 0;
};
export var releaseBindingReactions = function (reaction) {
    var _a;
    (_a = reaction._reactionsSet) === null || _a === void 0 ? void 0 : _a.forEach(function (reactionsMap) {
        reactionsMap.forEach(function (reactions) {
            reactions.delete(reaction);
        });
    });
    PendingReactions.delete(reaction);
    PendingScopeReactions.delete(reaction);
    delete reaction._reactionsSet;
};
export var suspendComputedReactions = function (current) {
    var _a;
    (_a = current._computesSet) === null || _a === void 0 ? void 0 : _a.forEach(function (reaction) {
        var reactions = getReactionsFromTargetKey(reaction._context, reaction._property);
        if (reactions.length === 0) {
            disposeBindingReactions(reaction);
            reaction._dirty = true;
        }
    });
};
export var disposeBindingReactions = function (reaction) {
    reaction._disposed = true;
    releaseBindingReactions(reaction);
    suspendComputedReactions(reaction);
};
export var batchStart = function () {
    BatchCount.value++;
};
export var batchEnd = function () {
    BatchCount.value--;
    if (BatchCount.value === 0) {
        var prevUntrackCount = UntrackCount.value;
        UntrackCount.value = 0;
        executePendingReactions();
        UntrackCount.value = prevUntrackCount;
    }
};
export var batchScopeStart = function () {
    BatchScope.value = true;
};
export var batchScopeEnd = function () {
    var prevUntrackCount = UntrackCount.value;
    BatchScope.value = false;
    UntrackCount.value = 0;
    PendingScopeReactions.forEach(function (reaction) {
        PendingScopeReactions.delete(reaction);
        if (isFn(reaction._scheduler)) {
            reaction._scheduler(reaction);
        }
        else {
            reaction();
        }
    });
    UntrackCount.value = prevUntrackCount;
};
export var untrackStart = function () {
    UntrackCount.value++;
};
export var untrackEnd = function () {
    UntrackCount.value--;
};
export var isBatching = function () { return BatchCount.value > 0; };
export var isScopeBatching = function () { return BatchScope.value; };
export var isUntracking = function () { return UntrackCount.value > 0; };
export var executePendingReactions = function () {
    PendingReactions.forEach(function (reaction) {
        PendingReactions.delete(reaction);
        if (isFn(reaction._scheduler)) {
            reaction._scheduler(reaction);
        }
        else {
            reaction();
        }
    });
};
export var hasDepsChange = function (newDeps, oldDeps) {
    if (newDeps === oldDeps)
        return false;
    if (newDeps.length !== oldDeps.length)
        return true;
    if (newDeps.some(function (value, index) { return value !== oldDeps[index]; }))
        return true;
    return false;
};
export var disposeEffects = function (reaction) {
    if (reaction._effects) {
        try {
            batchStart();
            reaction._effects.queue.forEach(function (item) {
                if (!item || !item.dispose)
                    return;
                item.dispose();
            });
        }
        finally {
            batchEnd();
        }
    }
};
//# sourceMappingURL=reaction.js.map