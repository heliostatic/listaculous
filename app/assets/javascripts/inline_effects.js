function init() {    
    $('ul .task').live({
        mouseenter: function (e) {
            $('#adder').remove(); //beats figuring it out
            var addel = '<span id="adder"></span>';
            if ($(this).children('#createPrompt').length == 0 && $(this).parent().children('#createPrompt').length == 0) {
                $(this).children('a').after(addel);
            }
            e.stopPropagation();
        },
        mouseleave: function (e) {
            $('#adder').remove();
            var parentbottom = $(e.target).parent().parent().offset().top + $(e.target).parent().parent().outerHeight();
            if (e.pageY < parentbottom) {
                $(e.target).parent().parent().trigger('mouseenter');
            }
            // e.stopPropagation();
        }
    });

    $('#adder').live('click', function (e) {
        var parent = $(this).parent();
        var prompt = $('#createPrompt').detach();
        var targ = parent.children('a');
        if (targ.length == 0) {
            targ = $('h1');
        }
        targ.after(prompt);
        prompt.children('input').focus();
        $('#list_parentlist_id').val($(this).parent().attr('id'))
        $('#adder').remove();
    });
}

$(function () {
    MakeSortable($('.tasklist')[0]);
    init();
})

function MakeSortable(list) {
    var container = $(list).parent();
    $(list).sortable({
        axis: 'y',
        dropOnEmpty: false,
        cursor: 'crosshair',
        items: 'li',
				helper: 'clone',
				forceHelperSize: true ,
        opacity: 0.4,
				toleranceElement: '> a',
        placeholder: "alert-message success",
        scroll: true,
        tolerance: "pointer",
        start: function (e, ui) {
            var pos = ui.item.parent().index();
            ui.item.attr('oldposition', pos);
            ui.item.attr('oldparent', ui.item.closest('ul').attr('data-listid'));
        },
        update: function (e, ui) {
            //check to see if parent is different, act accordingly
            var oldposition = ui.item.attr('oldposition');
            var oldparent = ui.item.attr('oldparent');
            var newparent = ui.item.closest('ul').attr('data-listid');
            //we use oldparent and oldposition attributes because once the item is dropped we have no information about it's past location
            ui.item.removeAttr('oldposition');
            ui.item.removeAttr('oldparent');
            if (oldparent == newparent) {
                var poschange = ui.item.parent().index() - oldposition;
                var casetype = 'sort_in_place';
                //the list was moved to a new parent
            } else {
                var casetype = "sort_across_lists";
            }
            var thedata = 'id=' + ui.item.attr('id') + '&old_parent=' + oldparent + '&poschange=' + poschange + '&new_parent=' + newparent + '&new_position=' + ui.item.index() + '&old_position=' + oldposition + '&case=' + casetype;
            $.ajax({
                type: 'put',
                data: thedata,
                dataType: 'script',
                complete: function (request) {

                    $(ui.item).effect('highlight');
                },
                url: '/lists/' + ui.item.attr('id')
            });
        }
    });
}
//13