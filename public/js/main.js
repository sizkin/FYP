$(document).ready(function() {
    

    /**
     * Socket Handler
     */
    var stat = io.connect('http://localhost:8033/stat');
    
    stat.emit('watch');
    stat.on('watched', function(data) {
        //console.log(JSON.stringify(data));
        $('#currentDir').html(data[0].cdir);
        $.each(data, function() {
            if(this.isDir) {
                $('#tbStat tbody').append(
                    '<tr>' +
                        '<td colspan="2"><i class="icon-folder-close"></i>' + this.name + '</td>' +
                        '<td>' + this.size + ' bytes</td>' +
                        '<td colspan="2">' + this.atime + '</td>' +
                        '<td colspan="2">' + this.ctime + '</td>' +
                        '<td colspan="2">' + this.mtime + '</td>' +
                    '</tr>'
                );
            } else {
                $('#tbStat tbody').append(
                    '<tr>' +
                        '<td colspan="2"><i class="icon-file"></i>' + this.name + '</td>' +
                        '<td>' + this.size + ' bytes</td>' +
                        '<td colspan="2">' + this.atime + '</td>' +
                        '<td colspan="2">' + this.ctime + '</td>' +
                        '<td colspan="2">' + this.mtime + '</td>' +
                    '</tr>'
                );
            }
        });
    });
    
});