$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.FirstName + '</td>';
                html += '<td>' + item.LastName + '</td>';
                html += '<td>' + item.State + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delete(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var empObj = {
        FirstName: $('#FirstName').val(),
        LastName: $('#LastName').val(),
        State: $('#State').val(),
        Phone: $('#Phone').val()
    };

    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


//Function for clearing the textboxes
function clearTextBox() {
    $('#Id').val("");
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#State').val("");
    $('#Phone').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#FirstName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#FirstName').val().trim() == "") {
        $('#FirstName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FirstName').css('border-color', 'lightgrey');
    }
    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() == "") {
        $('#State').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Phone').val().trim() == "") {
        $('#Phone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Phone').css('border-color', 'lightgrey');
    }
    return isValid;
}