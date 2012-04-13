// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
window.add(label);

window.addEventListener('open', function(e) {
    try {
        label.text = 'starting tests';
        require('test01_server').run_tests();    
        label.text = 'test01_server complete';
        require('test02_createdocument').run_tests();
        label.text = 'test02_createdocument complete';
        require('test02_createrevisions').run_tests();
        label.text = 'test02_createrevisions complete';
        require('test03_savemultipledocuments').run_tests();
        label.text = 'test03_savemultipledocuments complete';
        require('test03_savemultipleunsaveddocuments').run_tests();
        label.text = 'test03_savemultipleunsaveddocuments complete';
        require('test03_deletemultipledocuments').run_tests();
        label.text = 'test03_deletemultipledocuments complete';
        require('test04_deletedocument').run_tests();
        label.text = 'test04_deletedocument complete';
        require('test05_alldocuments').run_tests();
        label.text = 'test05_alldocuments complete';
    }
    catch (e) {
        label.text = e;
    }
});

window.open();


