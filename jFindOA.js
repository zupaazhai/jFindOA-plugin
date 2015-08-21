(function($) {

    $.fn.findBy = function(fields) {
        var returnByFields = [], eachField = {};
        if (fields == '*') {
            return this;
        } else if (Array.isArray(fields) && fields.length > 0) {
            this.each(function(j, record){
                eachField = {};
                for (i in fields) {
                    eachField[fields[i]] = record[fields[i]];
                }
                returnByFields.push(eachField);
            });

            return $(returnByFields);
        }
    }

    $.fn.where = function(cause,conditions) {
        var $this = this, eq, result = [];
        $this.each(function(j, val){
            var eq = undefined;
            $.each(conditions,function(i,key){
                var propertyName = Object.getOwnPropertyNames(key);
                if(key[propertyName] == val[propertyName]) {
                    result.push(j);
                }
            });
        });
        var packArr = {};
        var returnResult;
        cause = cause.toLowerCase();
        if(cause == '&' || cause == 'and') {
            result.forEach(function(i) { packArr[i] = (packArr[i]||0)+1;});
            var andResult = [];
            $.each(packArr,function(i,key){
                if(key == conditions.length) {
                    andResult.push(i);
                }
            });
            returnResult = andResult;
        } else if (cause == '|' || cause == 'or') {
            var orResult = [];
            $.each(result, function(i, key){
                if (orResult.indexOf(key) == -1) {
                    orResult.push(key);
                }
            });
            returnResult = orResult;
        }
        var resultObject = [];
        $.each(returnResult, function(i, key){
            resultObject.push($this[key]);
        });

        return $(resultObject);
    }

    $.fn.orderBy = function(field, order){
        var $this = this, x, y;
        var reOrder = $this.slice(0);
        if (order == undefined || order == 'asc') {
            order = 'asc';
            reOrder.sort(function(a,b) {
                x = a[field];
                y = b[field];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        } else {
            reOrder.sort(function(a,b) {
                x = a[field];
                y = b[field];
                return x > y ? -1 : x < y ? 1 : 0;
            });
        }
        return $(reOrder);
    }

    $.fn.limit = function(options) {
        var setting = {
            'offset' : 0,
            'limit' : 20
        }
        var $this = this;
        var opts = $.extend(setting, options);
        var limitResult = [];
        for (var i = opts.offset; i <= opts.limit; i++) {
            if ($this[i] == undefined) {
                break;
            }
            limitResult.push($this[i]);
        }
        return $(limitResult);
    }
}(jQuery));
