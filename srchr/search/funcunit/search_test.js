module("srchr/search",{
	setup : function(){
		S.open('//srchr/search/search.html')
	}
});

function search(query){
	S('input[name=query]').type(query+"\r")
}
	
// This wait is needed because IE is slow to clear out the textbox when clicked
function clearout(){
	S('input[name=query]').click()
	S('input[name=query]').val(new String())
}


test("Empty the search field and blur it", function(){
	S('input[name=query]').click(function(){
		ok(!S('input[name=query]').val().length, 'Text field is empty!')
	})
	
	S('html').click( function(){
		
		
		ok(S('input[name=query]').val(), 'Text field is filled!')
		ok(S('input[name=query]').hasClass('blurred'), 'Clicked query box is grayed out')
	})

});


test("Selected search box is not blurred and is empty", function(){
	
	S('input[name=query]').click({}, function(){
		ok(!S('input[name=query]').hasClass('blurred'), 'Clicked query box is not grayed out')
	})
});

test("Submit form with no query and no type", function(){
	
	S('input[type=submit]').click()
	
	S.wait(20, function(){
		ok(!S('#results').text(), "A search was not submitted: no query and no type")
	})
});

test("Submit form with a query but no type", function(){
	clearout()
	
	S('input[name=query]').type('hello world')
	S('input[type=submit]').click()
	
	S.wait(20, function(){
		ok(!S('#results').text(), "A search was not submitted: valid query, no type")
	})
});

test("Submit form with a valid query and type", function(){
	
	clearout()
	
	S('input[name=query]').type('testing...', function(){
		S('input[type=checkbox]:eq(0)').click({}, function(){
				
				S('input[type=submit]').click()
				
				S.wait(100, function(){
					ok(S('#results').text(), "A search was submitted, valid query and type")
				})
		})
	})
	
});