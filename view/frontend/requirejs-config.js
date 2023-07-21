var config = {
    map: {
        '*': {
            'Fr3on_QuickView/js/quickview': 'Fr3on_QuickView/js/quickview',
            'Fr3on_QuickView/js/quickview_minicart': 'Fr3on_QuickView/js/quickview_minicart'
        }
    },
    shim: {
        'Fr3on_QuickView/js/quickview_minicart': {
            deps: ['Fr3on_QuickView/js/quickview']
        }
    }
};
