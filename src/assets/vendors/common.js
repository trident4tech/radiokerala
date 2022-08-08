// /*
//  * Form element front end validators
//  *
//  * Copyright 2017 Origami Technologies
//  */
// /*
//  * Filter out non alphabet characters on keyup.
//  */
// $(document).ready(function () {
// 	$('input:text.text-label').attr('tabindex',-1);
// 	$( "input:text.text-label").unbind( "click" );
// 	//$(".icon_mandatory").attr('required','required');
// 	$("#filter_div").keypress(function (e) {
// 		var code = e.charCode || e.keyCode || e.which;    
// 		if (code==13) {
// 			e.preventDefault();
// 			$('form#filterform').submit();
// 		    return false;
// 		}
// 	});
// });

// $(document).on('keypress','input[type="text"]', function (e){
// 	var code = e.charCode || e.keyCode || e.which;
// 	if (code==13 && e.target.closest('form').id!='filterform') {
//         e.preventDefault();
//     }
// });

// $(document).on('change', '.date_picker_target', function (e) {
// 	targetElement=$(this);	
// 	if (targetElement.val()){
// 		targetElement.removeClass('error');
// 	 	targetElement.parent().find('span.error').remove();
// 	}
// });


// $(document).on('keypress keyup blur', '.fevAlpha', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^a-zA-Z]/g)) {
// 	        $(this).val(val.replace(/[^a-zA-Z]/g, ''));
// 	    }
// 	    if (val.match(/[^a-zA-Z ]/g)) {
// 	        $(this).val(val.replace(/[^a-zA-Z ]/g, ''));
// 	    }
//     }
// });

// /*
//  * Filter out non numeric characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevNumeric', function (e) {
//     var val = $(this).val();
//     if (val.match(/[^0-9]/g)) {
//         $(this).val(val.replace(/[^0-9]/g, ''));
//     }
// });

// /*
//  * Filter out non decimal characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevDecimal', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^0-9]/g)) {
//             $(this).val(val.replace(/[^0-9]/g, ''));
//         }
//         if (val.match(/[^0-9\.]/g)) {
//             $(this).val(val.replace(/[^0-9\.]/g, ''));
//         }
//         if (val.indexOf(".00") >= 0) {
//         	var n = val.indexOf('.');
//         	val = val.substring(0, n != -1 ? n : val.length);
//             $(this).val(val);
//         }
//         if (val.match('100.0')) {
//         	$(this).val(100);
//         }
//     }
// });

// /*
//  * Filter out non decimal characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevCurrency', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^0-9\.]/g)) {
//             $(this).val(val.replace(/[^0-9\.]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out mobile number characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevMobileNo', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val[0].match(/[^1-9]/g)) {
//             $(this).val(val.replace(/[^1-9]/g, ''));
//         }
//         if (val.match(/[^0-9]/g)) {
//             $(this).val(val.replace(/[^0-9]/g, ''));
//         }
//         if (val.length > 10) {
//             $(this).val(val.substring(0, 10));
//         }
//     }
// });

// /*
//  * Filter out zero on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevGreaterthanZero', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val[0].match(/[^1-9]/g)) {
//             $(this).val(val.replace(/[^1-9]/g, ''));
//         }        
//     }
// });

// /*
//  * Filter out greater than 100 on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevLessorEqualHundred', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val>100) {
//             $(this).val('');
//         }        
//     }
// });

// /*
//  * Filter out greater than 100 on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevExperience', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val>60) {
//             $(this).val('');
//         }        
//     }
// });

// /*
//  * Filter out phone number characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevPhoneNo', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^0-9]/g)) {
//             $(this).val(val.replace(/[^0-9]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non aadhaar characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevAadhaarNo', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^0-9]/g)) {
//             $(this).val(val.replace(/[^0-9]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non pincode characters on keyup.
//  */
// $(document).on('keypress keyup blur', '.fevPincode', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val[0].match(/[^1-9]/g)) {
//             $(this).val(val.replace(/[^1-9]/g, ''));
//         }
//         if (val.match(/[^0-9]/g)) {
//             $(this).val(val.replace(/[^0-9]/g, ''));
//         }
//         if (val.length >6) {
//             $(this).val(val.substring(0, 6));
//         }
//     }
// });

// /*
//  * Set minimum and max length for the elements on focus
//  */

// $(document).on('focus', '.fevMobileNo', function (e) {
//     $(this).attr('minlength', '10');
//     $(this).attr('maxlength', '10');
// });

// $(document).on('focus', '.fevPhoneNo', function (e) {
//     $(this).attr('minlength', '6');
//     $(this).attr('maxlength', '11');
// });

// $(document).on('focus', '.fevPincode', function (e) {
//     $(this).attr('minlength', '6');
//     $(this).attr('maxlength', '6');
// });

// $(document).on('focus', '.fevAadhaarNo', function (e) {
//     $(this).attr('minlength', '12');
//     $(this).attr('maxlength', '12');
// });

// $(document).on('focus', '.fevIFSCcode', function (e) {
//     $(this).attr('minlength', '11');
//     $(this).attr('maxlength', '11');
// });

// $(document).on('focus', '.fevRange', function (e) {
//     var min_length=targetElement.attr('minValue');
//     var max_length=targetElement.attr('maxValue');
//     $(this).attr('minlength', min_length);
//     $(this).attr('maxlength', max_length);
// });

// $(document).on('focus', '.fevPassword', function (e) {
//     $(this).attr('minlength', '8');
//     $(this).attr('maxlength', '20');
// });

// $(document).on('focus', '.fevAccount', function (e) {
//     $(this).attr('minlength', '11');
//     $(this).attr('maxlength', '25');
// });

// /*
//  * #################################################################
//  */

// /*
//  * Filter out non alphanumeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAlphaNum', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^A-Za-z0-9]/g)) {
// 	        $(this).val(val.replace(/[^A-Za-z0-9]/g, ''));
// 	    }
//     	if (val.match(/[^A-Za-z0-9 ]/g)) {
//     		$(this).val(val.replace(/[^A-Za-z0-9 ]/g, ''));
//     	}
//     }
// });

// /*
//  * Filter out non alphanumeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAlphaNumEquipId', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val==0) {
// 	        $(this).val(val.replace(val, ''));
// 	    }
//     	if (val.match(/[^A-Za-z0-9 ]/g)) {
//     		$(this).val(val.replace(/[^A-Za-z0-9 ]/g, ''));
//     	}
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow limited special characters) on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumSpecial', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9 \(\)\.-]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9 \(\)\.-]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAlphaNumIFSC', function (e) {
//     var val = $(this).val();
//     if (val.match(/[^A-Z0-9]/g)) {
//         $(this).val(val.replace(/[^A-Z0-9]/g, ''));
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow - only) on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumHyphen', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9 \-]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9 \-]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow - only) on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumOnly', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9\-]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9\-]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow ' ' only) on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumSpace', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9 \ ]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9 \ ]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow special characters !  @  #  $  &  (  )  -  ‘  .  /  +  ,  “) and not space on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumSpecialDisplayname', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9 \!@#$&()\\-`.+,/\"]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9 \!@#$&()\\-`.+,/\"]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow  / ) and not space on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumSlash', function (e) {
//     var val = $(this).val();
//     if (val) {
//         if (val.match(/[^A-Za-z0-9 /\"]/g)) {
//             $(this).val(val.replace(/[^A-Za-z0-9 /\"]/g, ''));
//         }
//     }
// });

// /*
//  * Filter out non alphanumeric characters (allow special characters !  @  #  $  &  (  )  -  ‘  .  /  +  ,  “) and not space on keyup.
//  */
// $(document).on('keyup keypress', '.fevAphanumSpecialwkcname', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^A-Za-z&`()]/g)) {
// 	        $(this).val(val.replace(/[^A-Za-z&`()]/g, ''));
// 	    }
//         if (val.match(/[^A-Za-z&`() ]/g)) {
//             $(this).val(val.replace(/[^A-Za-z&`() ]/g, ''));
//         }
//     }
// });

// /*
//  * Validate email address
//  */

// /*
//  * Filter out non alphanumeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAlphaNumPNR', function (e) {
//     var val = $(this).val();
//     if (val.match(/[^A-Za-z0-9]/g)) {
//         $(this).val(val.replace(/[^A-Za-z0-9]/g, ''));
//     }
// });

// /*
//  * Filter out non alphanumeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAlphaNumUsername', function (e) {
//     var val = $(this).val();
//     if (val.match(/[^A-Za-z0-9@_\.]/g)) {
//         $(this).val(val.replace(/[^A-Za-z0-9@_\.]/g, ''));
//     }
// });

// /*
//  * Filter out non numeric characters on keyup.
//  */
// $(document).on('keyup keypress', '.fevAccount', function (e) {
//     var val = $(this).val();
//     if (val.match(/[^0-9]/g)) {
//         $(this).val(val.replace(/[^0-9]/g, ''));
//     }
// });

// $(document).on('keyup keypress', '.fevEmail', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^A-Za-z0-9]/g)) {
// 	        $(this).val(val.replace(/[^A-Za-z0-9]/g, ''));
// 	    }
//     }
// });

// $(document).on('keyup keypress', '.fevAphanumSOP', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^A-Za-z0-9]/g)) {
// 	        $(this).val(val.replace(/[^A-Za-z0-9]/g, ''));
// 	    }
//     }
// });

// $(document).on('keyup keypress', '.fevSanctionOrder', function (e) {
//     var val = $(this).val();
//     if (val) {
//     	if (val[0].match(/[^A-Za-z0-9]/g)) {
// 	        $(this).val(val.replace(/[^A-Za-z0-9]/g, ''));
// 	    }
//     	if (val.match(/[^-A-Za-z0-9., /\/]/g)) {
//     		$(this).val(val.replace(/[^-A-Za-z0-9., /\/]/g, ''));
//     	}
//     }
// });

// function validateEmail(targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
//     if (!pattern.test(val)) {
//     	if (!targetElement.hasClass('error')) {
//         	targetElement.addClass('error');
//             targetElement.after('<span id="errors-email" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Invalid mail address</label></span>');
//         }
//     } else {
//     	targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate IFSC Code
//  */
// function validateIFSCCode(targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /\(?([A-Za-z]{4})\)?([0]{1}?)([0-9]{6})/;
//     // ([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})
//     if (!val.match(pattern)) {
//         if (!targetElement.hasClass('error')) {
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-ifsccode" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid IFSC Code (Eg. ABCD0123456).</label></span>');
//         }
//     } else {
//         targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate Pincode
//  */
// function validatePincode(targetElement) 
// {
// 	var val = targetElement.val().replace(/^[0]+/g,"");
// 	var pattern = /\(?([1-9]{1})\)?([0-9]{5}?)/;
// 	// ([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})
//     if (!val.match(pattern)|| parseInt(val)==0) {
//         if (!targetElement.hasClass('error')) {
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-pincode" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid Pincode.</label></span>');
//         }
//     } else {
//         targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate Mobile Number
//  */
// function validateMobileNum(targetElement) 
// {
//     var val = targetElement.val().replace(/^[0]+/g,"");
//     var pattern = /\(?([1-9]{1})\)?([0-9]{9}?)/;
//     // ([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})
//     if (!val.match(pattern)|| parseInt(val)==0) {
//         if (!targetElement.hasClass('error')) {
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-mobile" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid 10 digit mobile number.</label></span>');
//         }
//     } else {
//         targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate Amount
//  */
// function validateAmount(targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^\d{1,}(?:\.{0,1}\d{0,2})$/;
//     // ([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})
//     if (!val.match(pattern)) {
//         if (!targetElement.hasClass('error')) {
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-amount" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid amount.</label></span>');
//         }
//     } else {
//         targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate decimal
//  */
// function validateDecimal(targetElement) 
// {
//     var val = targetElement.val();
//     if (val) {
//         var pattern = /^\d{1,}(?:\.{0,1}\d{0,})$/;
//         // ([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/^\d+(\.\d{1,2})?$/
//         if (!val.match(pattern)) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-decimal" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid decimal.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate ward no
//  */
// function validateWardNo(targetElement) 
// {
// 	var val = targetElement.val();
//     if (val) {
//         var pattern =/^\d{1,2}-([a-zA-Z])/;
//         if (!val.match(pattern)) {        	
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-wardno" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid ward name (Eg.12-ABCD).</label></span>');
//                 return false;
//             }
//         } else {        	
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//             return true;
//         }
//     }
// }

// /*
//  * Validate lessthan or equal for float with attribute 'relatedto'
//  */
// function validateLessThanOrEqual(targetElement) 
// {	
// 	var attr = targetElement.attr('relatedto');
// 	var max = 0;
	
// 	if (typeof attr !== typeof undefined && attr !== false) {
// 		max=$("#"+attr).val();    	
// 	}	
	
//     var val = targetElement.val();   
//     if (val) {    	
//     	var msg=targetElement.attr('lessthanmessage');    	
//         if (parseFloat(val)>parseFloat(max)) {  
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 if (msg)
//                 	targetElement.after('<span id="errors-lessthan" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>'+msg+' </label></span>');
//                 else
//                 	targetElement.after('<span id="errors-lessthan" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>'+val + ' is not less than '+max+' </label></span>');
//                 return false;
//             }
//         } else {        	
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//             return true;
//         }
//     }
// }

// /*
//  * Validate greaterthan or equal for float with attribute 'relatedto'
//  */
// function validateGreaterThanOrEqual(targetElement) 
// {	
// 	var max=targetElement.attr('maximum_value');	
//     var val = targetElement.val();   
//     if (val) {
//     	var msg=targetElement.attr('lessthanmessage');
//     	if (parseFloat(val)<parseFloat(max)) {  
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 if (msg)
//                 	targetElement.after('<span id="errors-lessthan" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>'+msg+' </label></span>');
//                 else
//                 	targetElement.after('<span id="errors-lessthan" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>'+val + ' is not less than '+max+' </label></span>');
//                 return false;
//             }
//         } else {        	
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//             return true;
//         }
//     }
// }

// /*
//  * Validate mandatory
//  * 
//  * @update: 
//  * 
//  * Check for connected fields. Based on the connected field constrain, the mandatory condition
//  * is checked
//  */
// function validateMandatory(targetElement) 
// {
//    formid= $(targetElement).parents('form:last');
//     if (formid!="filterform")
//     {
//         var connected_fields = targetElement.attr('connField');
//         var ConnArray = [];
//         var validateField = true;
//         var connElement = '';
//         var connElementArr = [];
//         if (typeof connected_fields !== typeof undefined && connected_fields !== false) {	
//             ConnArray = connected_fields.split(" ");
//             $.each(ConnArray, function(key, value) 
//             {
//                 connElementArr = value.split("-"); 
//                 connElement = '#'+connElementArr[0];
//                 if ($(connElement).val() != connElementArr[1]) {
//                     validateField = false;
//                 }
//             });
//         }                

//         targetElement.parent().find('span#errors-mandatory').remove();
//         var val = $.trim(targetElement.val())
//         if (!val && validateField == true) {            
//             var errorMessage = "The field cannot be left blank"; 
           
//             var attr = targetElement.attr('message');
//         	if (typeof(attr)==='undefined'){
//         		 var errorMessage = "The field cannot be left blank";            	
//             } else {
//         		var errorMessage = attr+" required";
//         	}
//         	if (!targetElement.hasClass('error')) {
//         		targetElement.addClass('error');
//         	} else {
//         		targetElement.parent().find('span.error').remove();
//         	}
//         	var datePickerData = targetElement.data('datepicker');
//         	if(datePickerData == undefined || datePickerData == 'undefined' || datePickerData == '') {
// 	            if(!targetElement.hasClass('hideerror')) {
// 	            	targetElement.after('<span id="errors-mandatory" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>'+errorMessage+'</label></span>');
// 	            }
//         	}
// 	            return false;

//         } else {
//         	if (targetElement.hasClass('fevWardNo'))	{  
//             	if (validateWardNo(targetElement)) {
//                 	targetElement.removeClass('error');
//                     targetElement.parent().find('span.error').remove();
//                     return true;
//             	} else if (validateIFSCCode(targetElement)) {                	
//                     targetElement.removeClass('error');
//                     targetElement.parent().find('span.error').remove();
//                     return true;
//                 } else {
//                     return false;
//                 }
//         	}
//         	if (targetElement.hasClass('fevIFSCcode')) {     
//             	if (validateIFSCCode(targetElement)) {            	
//                     targetElement.removeClass('error');
//                     targetElement.parent().find('span.error').remove();
//                     return true;
//             	} else {
//                     return false;
//                 }            		
//         	}
//         	if (targetElement.hasClass('fevPincode')) {      
//             	if (validatePincode(targetElement)) {
//                     targetElement.removeClass('error');
//                     targetElement.parent().find('span.error').remove();
//                     return true;
//             	} else {                    
//                     return false;
//                 }
//         	}
//             if (targetElement.hasClass('fevAlphaNumPNR')) {      
//                 if (checkPRN(targetElement)) {                	
//                     targetElement.removeClass('error');
//                     targetElement.parent().find('span.error').remove();
//                     return true;
//                 } else {
//                     return false;
//                 }
                		
//             }
//             if (targetElement.hasClass('error')) {
//             	targetElement.removeClass('error');
//                 targetElement.parent().find('span.error').remove();
//             }
//         }        
//     }
// }

// /*
//  * check Range and display error to fieldId
//  */
// function checkRange(minValue,maxValue,fieldId)
// {						
// 	targetElement=fieldId;			
// 	if (parseInt(maxValue)<=parseInt(minValue))	{ 
// 		if (!targetElement.hasClass('error')) {
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-mandatory" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Duration To Must be greater than Duration From</label></span>');
//         } 
// 		else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//             targetElement.addClass('error');
//             targetElement.after('<span id="errors-mandatory" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Duration To Must be greater than Duration From</label></span>');
//         }
// 	} else if (parseInt(maxValue)>parseInt(minValue)) {
// 		 targetElement.removeClass('error');
//          targetElement.parent().find('span.error').remove();
// 	} else if (!(maxValue.trim())) {				
// 		 targetElement.removeClass('error');
//          targetElement.parent().find('span.error').remove();
//          targetElement.addClass('error');
//          targetElement.after('<span id="errors-mandatory" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Duration From required</label></span>');
//     } else {				
//         targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }		

// /*
//  * Clear error class
//  */
// function clearError (targetElement) 
// {   
// 	if (targetElement.hasClass('error')) {               
// 		targetElement.removeClass('error');
//         targetElement.parent().find('span.error').remove();
//     }
// }

// /*
//  * Validate password strength
//  */
// function validatePassword (targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
//     if (val) {
//     	if (!val.match(pattern)) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-password" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Password must contain minimum 8 characters and at least one special character and capital letter.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate Aadhar No
//  */
// function validateAadharno (targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^[0-9]{12}$/;
//     if (val) {
//     	if (!val.match(pattern)|| parseInt(val)==0) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-aadhaarno" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>The Aadhaar number should only contain numbers. It must be 12 digits.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate password identical
//  */
// function validateIdentical (targetElement) 
// {
//     var val = targetElement.val();
//     var token = targetElement.attr('token');
//     if (val) {
//     	if (val!=$("#"+token).val()) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span class="error" id="errors-repass"><label class="error" style="padding:5px"><i class="fa fa-times-circle-o"></i>The passwords doesn\'t match</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// function validateGreaterthanZero (targetElement) 
// {
//     var val = targetElement.val();
//     if (val) {
//     	if (val==0) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span class="error" id="errors-crcap"><label class="error" style="padding:5px"><i class="fa fa-times-circle-o"></i>Value must be greater than 0.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate Account No
//  */
// function validateAccountNo (targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^[0-9][\d\d]{10,25}$/;
//     if (val) {
//     	if (!val.match(pattern)) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-aadhaarno" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>The account number should only contain numbers. It must be minimum 11 digits.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate Account No
//  */
// function validateContactNo (targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /^[0-9][\d\d]{5,10}$/;
//     if (val) {
//     	if (!val.match(pattern) || parseInt(val)==0) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-aadhaarno" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid contact number.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// /*
//  * Validate Sanction Order
//  */
// function validateSanctionOrder (targetElement) 
// {
//     var val = targetElement.val();
//     var pattern = /[^-A-Za-z0-9., /\/]/g;
//     if (val) {
//     	if (!val.match(pattern) || parseInt(val)==0) {
//             if (!targetElement.hasClass('error')) {
//                 targetElement.addClass('error');
//                 targetElement.after('<span id="errors-sanctionOrder" class="error"><label style="padding:5px" class="error"><i class="fa fa-times-circle-o"></i>Please enter a valid Sanction order.</label></span>');
//             }
//         } else {
//             targetElement.removeClass('error');
//             targetElement.parent().find('span.error').remove();
//         }
//     }
// }

// $(document).on('change', '.fevDecimal', function () {
//     var targetElement = $(this);
//     validateDecimal(targetElement);
// });

// $(document).on('change', '.fevCurrency', function () {
//     var targetElement = $(this);
//     validateAmount(targetElement);
// });

// $(document).on('change', '.fevMobileNo', function () {
//     var targetElement = $(this);
//     validateMobileNum(targetElement);
// });

// $(document).on('change', '.fevIFSCcode', function () {
//     var targetElement = $(this);
//     validateIFSCCode(targetElement);
// });

// $(document).on('change', '.fevEmail', function () {
//     var targetElement = $(this);
// 	validateEmail(targetElement);
// });


// $(document).on('change', '.fevWardNo', function () {
//     var targetElement = $(this);
//     validateWardNo(targetElement);
// });

// $(document).on('change', '.fevPhoneNo', function () {
//     var targetElement = $(this);
//     validateContactNo(targetElement);
// });

// $(document).on('change', '.fevSanctionOrder', function () {
//     var targetElement = $(this);
//     validateSanctionOrder(targetElement);
// });

// $(document).on('focusout', '.icon_mandatory', function () {
//     var targetElement = $(this);
//     validateMandatory(targetElement);

// });

// $(document).on('change', 'select.icon_mandatory', function () {	
//     var targetElement = $(this);
//     validateMandatory(targetElement);

// });

// $(document).on('focusin mouseover', 'button.submit_alias', function () {
// 	var targetElement = $('.icon_mandatory').last();
//     var val=$.trim(targetElement.val());   
//     if(val.length>0)
//     	clearError(targetElement);
// });

// $(document).on('focusout', '.fevPassword', function () {
//     var targetElement = $(this);
//     validatePassword(targetElement);

// });

// $(document).on('focusout', '.fevAadhaarNo', function () {
// 	var targetElement = $(this);
//     validateAadharno(targetElement);
// });

// $(document).on('focusout', '.fevIdentical', function () {
// 	var targetElement = $(this);
//     validateIdentical(targetElement);
// });

// $(document).on('focusout', '.fevGreaterthanZero', function () {
// 	var targetElement = $(this);
// 	validateGreaterthanZero(targetElement);
// });

// $(document).on('focusout', '.fevEmail', function () {
//     var targetElement = $(this);
// 	validateEmail(targetElement);
// });

// $(document).on('focusout', '.fevAccount', function () {
//     var targetElement = $(this);
// 	validateAccountNo(targetElement);
// });

// $(document).on('focusout', '.fevLessThanOrEqual', function () {	
//     var targetElement = $(this);
// 	validateLessThanOrEqual(targetElement);
// });

// $(document).on('focusout', '.fevGreaterThanOrEqual', function () {	
//     var targetElement = $(this);
// 	validateGreaterThanOrEqual(targetElement);
// });


// $(document).on('focusout', '.fevMobileNo', function () {
//     var targetElement = $(this);
//     if(targetElement.hasClass('icon_mandatory') || targetElement.val()) // validate mandatory mobile no or optional mob no has any value 
//     validateMobileNum(targetElement);
//     else   //remove error for empty optional mob no 
//     	{
//     	 targetElement.removeClass('error');
//          targetElement.parent().find('span.error').remove();
//     	}
// });

// $(document).on('focusout', '.fevPhoneNo', function () {
//     var targetElement = $(this);
//     validateContactNo(targetElement);
// });