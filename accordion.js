<!-- Reference the jQueryUI theme's stylesheet on the Google CDN. Here we're using the "Start" theme -->
<link type="text/css" rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/themes/start/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="<<CSS>>"/>
<!-- Reference jQuery on the Google CDN -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<!-- Reference jQueryUI on the Google CDN -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js"></script>
<!--<script src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js" type="text/javascript"></script>-->
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>

<script type="text/javascript">
	jQuery(document).ready(function($) {
		retrieveAllListProperties(<<Sharepoint URL>>);
	});//End DocumentReady
	function toggleDiv(divId) {
   		$("#"+divId).toggle();
 	}

 function retrieveAllListProperties(siteUrl) {
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(<<List Name>>);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><IsNotNull><FieldRef Name=\'Order0\' Ascending=\'TRUE\'/></IsNotNull></Where></Query><RowLimit>0</RowLimit></View>');
 	this.collList = oList.getItems(camlQuery);
    clientContext.load(collList);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    var listInfo = '';
    var listEnumerator = this.collList.getEnumerator();
	var i = 1;
    	while (listEnumerator.moveNext()) {
        	var oList = listEnumerator.get_current();
            var title = oList.get_item('Title');
            var order = oList.get_item('Order0');

            var result = order.toString().split(".");
            if (result.length > 1){
            	$("#accord" + result[0]).append('<div class="accordion-section"><a class="accordion-section-title" href="javascript:toggleDiv(\'accord'+ result[0] + '-' + result[1] + '\');">'+title+'</a> <div id="accord' + result[0] + '-' + result[1]+ '" class="accordion-section-content">' + oList.get_item('Content')+ '</div></div>');
            }else{
            $(".accordian").append('<div class="accordion-section"><a class="accordion-section-title" href="javascript:toggleDiv(\'accord'+ i + '\');">'+title+'</a> <div id="accord' + i + '" class="accordion-section-content">' + oList.get_item('Content')+ '</div></div>');
			}
			i++;
    	}
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}
</script>
<div class="accordian"></div>
