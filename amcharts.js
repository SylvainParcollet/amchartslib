(function() {
    let shadowRoot;

    var Ar = [];
    var xvaluearr = [];	
    var yvaluearr = [];	
	


    let template = document.createElement("template");

	
    template.innerHTML = `
		<style type="text/css">	
		body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		}
		</style>       
	`
	
    //https://www.amcharts.com/lib/4/core.js
    const amchartscorejs = "https://sylvainparcollet.github.io/amchartslib/core.js";
    //https://www.amcharts.com/lib/4/charts.js
    const amchartschartsjs = "https://sylvainparcollet.github.io/amchartslib/charts.js";
    //https://www.amcharts.com/lib/4/themes/animated.js
    const amchartsanimatedjs = "https://sylvainparcollet.github.io/amchartslib/animated.js";
    //https://www.amcharts.com/lib/4/maps.js
    const amchartsmapsjs = "https://sylvainparcollet.github.io/amchartslib/maps.js";
    //https://www.amcharts.com/lib/4/geodata/continentsLow.js
    const amchartscontinentlowjs = "https://sylvainparcollet.github.io/amchartslib/continentsLow.js";
    //https://www.amcharts.com/lib/4/geodata/worldLow.js
    const amchartsworldlowjs = "https://sylvainparcollet.github.io/amchartslib/worldLow.js";

	function loadScript(src) {
	  return new Promise(function(resolve, reject) {
		let script = document.createElement('script');
		console.log("¦¦¦¦¦¦¦¦¦¦¦¦ Load script ¦¦¦¦¦¦¦¦¦¦");
		console.log(src);	    
		console.log("¦¦¦¦¦¦¦¦¦¦¦¦ Load script ¦¦¦¦¦¦¦¦¦¦");	    
		script.src = src;

		script.onload = () => {console.log("Load: " + src); resolve(script);}
		script.onerror = () => reject(new Error(`Script load error for ${src}`));

		shadowRoot.appendChild(script)
	  });
	}

	

    // Create the chart
    function Amchartkaramba(divid,value) {

        var data = {};
		console.log("/////////////// Amchart - " + value);    
			if (value !== "") {
				data = JSON.parse(value);
				console.log(data);
			}
		console.log("/////////////// Amchart - A ");    
		am4core.useTheme(am4themes_animated);
	
		console.log("/////////////// Amchart - create " + divid);    
		var chart = am4core.create(divid, am4charts.XYChart);
		chart.data = data;    
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.dataFields.category = "category";
		categoryAxis.renderer.minGridDistance = 15;
		categoryAxis.renderer.grid.template.location = 0.5;
		categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
		categoryAxis.renderer.labels.template.rotation = -90;
		categoryAxis.renderer.labels.template.horizontalCenter = "left";
		categoryAxis.renderer.labels.template.location = 0.5;    
		categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
			return -target.maxRight / 2;
		})
	    
	    console.log("/////////////// Amchart - value axis ");
	    
	    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.tooltip.disabled = true;
		valueAxis.renderer.ticks.template.disabled = true;
		valueAxis.renderer.axisFills.template.disabled = true;
	    console.log("/////////////// Amchart - series ");
	    var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.categoryX = "category";
		series.dataFields.valueY = "value";
		series.tooltipText = "{valueY.value}";
		series.sequencedInterpolation = true;
		series.fillOpacity = 0;
		series.strokeOpacity = 1;
		series.strokeDashArray = "1,3";
		series.columns.template.width = 0.01;
		series.tooltip.pointerOrientation = "horizontal";
		console.log("/////////////// Amchart - bullets ");
	    var bullet = series.bullets.create(am4charts.CircleBullet);

		chart.cursor = new am4charts.XYCursor();
		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarY = new am4core.Scrollbar();

    };	
	
	
    // Create the chart
    function Sankeychartkaramba(divid,value) {

		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end

		console.log("/////////////// Sankey");    
		var chart = am4core.create(divid, am4charts.SankeyDiagram);

		chart.data = [
		  { from: "Cash in the U.S.", color: "#00aea0"},
		  { from: "Cash Overseas", color: "#000000"},

		  { from: "Source", to: "Total non financial companies", value: 1768, color: "#5ea9e1", labelText: "[font-size:1.5em]2016 BREAKDOWN OF\nTHE U.S.CORPORATE CASH PILE\n\n[/]NON-FINANCIAL COMPANIES \n [bold]$1,768 Trillion[/b]", zIndex: 100 },

		  { from: "Total non financial companies", to: "Non-tech companies", value: 907, color: "#5ea9e1", labelText: "NON-TECH COMPANIES\n [bold]$907 Billion[/]" },
		  { from: "Total non financial companies", to: "Tech companies", value: 861, color: "#5ea9e1", labelText: "TECH COMPANIES\n [bold]861 Billion[/]" },

		  { from: "Non-tech companies", to: "Cash in the U.S.", value: 324, color: "#5ea9e1", zIndex: 101 },
		  { from: "Non-tech companies", to: "Cash Overseas", value: 584, color: "#5ea9e1" },

		  { from: "Tech companies", to: "Rest of tech", value: 274, color: "#5ea9e1", labelText: "REST OF TECH\n[bold]$274 Billion[/]" },
		  { from: "Tech companies", to: "Top 5 tech companies", value: 587, color: "#5ea9e1", labelText: "TOP 5 TECH COMPANIES\n[bold]$587 Billion[/]" },

		  { from: "Rest of tech", to: "Cash in the U.S.", value: 74, color: "#5ea9e1", zIndex: 100 },
		  { from: "Rest of tech", to: "Cash Overseas", value: 200, color: "#5ea9e1" },

		  { from: "Top 5 tech companies", to: "Joytechs", value: 67, color: "#5ea9e1" },
		  { from: "Joytechs", to: "Cash in the U.S.", value: 10, color: "#5ea9e1" },
		  { from: "Joytechs", to: "Cash Overseas", value: 57, color: "#5ea9e1", center: "right", dy: -50, labelText: "JOYTECHS [bold]$67[/]B", labelLocation: 0, labelRotation: 0 },

		  { from: "Top 5 tech companies", to: "Fireex", value: 68, color: "#5ea9e1" },
		  { from: "Fireex", to: "Cash in the U.S.", value: 8, color: "#5ea9e1" },
		  { from: "Fireex", to: "Cash Overseas", value: 60, color: "#5ea9e1", center: "right", dy: -50, labelText: "FIREEX [bold]$68[/]B", labelLocation: 0, labelRotation: 0 },

		  { from: "Top 5 tech companies", to: "Globalworld", value: 85, color: "#5ea9e1" },
		  { from: "Globalworld", to: "Cash in the U.S.", value: 10, color: "#5ea9e1" },
		  { from: "Globalworld", to: "Cash Overseas", value: 75, color: "#5ea9e1", center: "right", dy: -50, labelText: "GLOBALWORLD [bold]$85[/]B", labelLocation: 0, labelRotation: 0 },

		  { from: "Top 5 tech companies", to: "Betagate", value: 115, color: "#5ea9e1" },
		  { from: "Betagate", to: "Cash in the U.S.", value: 10, color: "#5ea9e1" },
		  { from: "Betagate", to: "Cash Overseas", value: 105, color: "#5ea9e1", center: "right", dy: -50, labelText: "BETAGATE [bold]$115[/]B", labelLocation: 0, labelRotation: 0 },

		  { from: "Top 5 tech companies", to: "Apexi", value: 253, color: "#5ea9e1" },
		  { from: "Apexi", to: "Cash in the U.S.", value: 23, color: "#5ea9e1" },
		  { from: "Apexi", to: "Cash Overseas", value: 230, color: "#5ea9e1", center: "right", dy: -50, labelText: "APEXI [bold]$253[/]B", labelLocation: 0, labelRotation: 0 },

		  { from: "Cash in the U.S.", color: "#00aea0", labelText: "CASH IN THE U.S.\n[bold]$460 BILLION", labelLocation: 0, value: 460, zIndex: 102, dy: -30 },
		  { from: "Cash Overseas", color: "#000000", labelText: "[#5ea9e1 font-size:1.5em]CASH OVERSEAS\n[bold #5ea9e1 font-size:1.5em]$1,31 TRILLION", labelLocation: 0, value: 1310, dy: -30 }
		];
		console.log("/////////////// Sankey B");
		chart.minNodeSize = 0.001;
		chart.nodeAlign = "bottom";
		chart.paddingLeft = 80;
		chart.paddingRight = 80;
		chart.dataFields.fromName = "from";
		chart.dataFields.toName = "to";
		chart.dataFields.value = "value";
		chart.dataFields.color = "color";

		chart.orientation = "vertical";
		chart.sortBy = "none";

		chart.nodes.template.togglable = false;

		var linkTemplate = chart.links.template;
		linkTemplate.colorMode = "gradient";
		linkTemplate.fillOpacity = 0.95;

		linkTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
		linkTemplate.readerTitle = "drag me!";
		linkTemplate.showSystemTooltip = true;
		linkTemplate.tooltipText = "";
		linkTemplate.propertyFields.zIndex = "zIndex";
		linkTemplate.tension = 0.6;
		console.log("/////////////// Sankey dragging");
		//dragging
		chart.links.template.events.on("down", function (event) {
		  var fromNode = event.target.dataItem.fromNode;
		  var toNode = event.target.dataItem.toNode;

		  var distanceToFromNode = am4core.math.getDistance(event.pointer.point, { x: fromNode.pixelX, y: fromNode.pixelY });
		  var distanceToToNode = Infinity;
		  if (toNode) {
			distanceToToNode = am4core.math.getDistance(event.pointer.point, { x: toNode.pixelX, y: toNode.pixelY });
		  }

		  if (distanceToFromNode < distanceToToNode) {
			fromNode.dragStart(event.pointer);
		  }
		  else {
			toNode.dragStart(event.pointer);
		  }
		})
		console.log("/////////////// Sankey Nodes bullets");
		chart.nodes.template.draggable = true;
		chart.nodes.template.inert = true;
		chart.nodes.template.width = 0;
		chart.nodes.template.height = 0;
		chart.nodes.template.nameLabel.disabled = true;
		chart.nodes.template.clickable = false;

		var labelBullet = chart.links.template.bullets.push(new am4charts.LabelBullet());
		labelBullet.label.propertyFields.text = "labelText";
		labelBullet.propertyFields.locationX = "labelLocation";
		labelBullet.propertyFields.rotation = "labelRotation";
		labelBullet.label.rotation = -90;
		labelBullet.propertyFields.dy = "dy";
		labelBullet.label.propertyFields.horizontalCenter = "center";
		labelBullet.label.textAlign = "middle";
		console.log("/////////////// Sankey End");
		}; 	

// Create the chart
    function Mapkaramba(divid,value) {
	    

var data = {
  "AL": 504.38,
  "AM": 6.5,
  "AO": 2.98,
  "AR": 0.32,
  "AT": 10.9,
  "AU": 5.02,
  "AZ": 17.38,
  "BA": 24.45,
  "BD": 13.4,
  "BE": 12.06,
  "BF": 93.37,
  "BG": 1.68,
  "BI": 0.95,
  "BJ": 93.36,
  "BR": 49.42,
  "BT": 10.03,
  "BY": 26.16,
  "CA": 0.96,
  "CD": 69.71,
  "CF": 4.57,
  "CG": 19.7,
  "CH": 6.19,
  "CI": 14.1,
  "CL": 1.4,
  "CM": 41.26,
  "CN": 2.6,
  "CO": 4.48,
  "CY": 7.69,
  "CZ": 23.09,
  "DK": 1.58,
  "EE": 9.91,
  "EG": 0.63,
  "ES": 4.96,
  "FI": 3.27,
  "FR": 43.26,
  "GA": 3.03,
  "GB": 14.3,
  "GE": 809.09,
  "GH": 39.78,
  "GM": 2.45,
  "GN": 45.98,
  "GQ": 23.74,
  "GR": 154.42,
  "HR": 5.46,
  "HU": 1.44,
  "ID": 16.87,
  "IE": 17.56,
  "IL": 412.24,
  "IN": 47.85,
  "IQ": 12.96,
  "IR": 1.13,
  "IT": 44.29,
  "JP": 3.27,
  "KE": 16.8,
  "KG": 253.37,
  "KH": 0.44,
  "KM": 1.26,
  "KZ": 116.3,
  "LA": 1.33,
  "LK": 0.53,
  "LR": 692.27,
  "LS": 5.9,
  "LT": 14.44,
  "LU": 6.95,
  "LV": 6.09,
  "MA": 0.2,
  "MD": 83.75,
  "ME": 319.75,
  "MG": 2386.35,
  "MK": 28.83,
  "ML": 48.68,
  "MM": 40.31,
  "MN": 0.66,
  "MR": 14.65,
  "MT": 11.65,
  "MV": 9.35,
  "MX": 0.04,
  "MY": 86.41,
  "MZ": 13.49,
  "NA": 12.9,
  "NE": 80.88,
  "NG": 31.44,
  "NL": 1.47,
  "NO": 2.47,
  "NP": 10.8,
  "NZ": 9.23,
  "PE": 1.29,
  "PK": 159.14,
  "PL": 8.24,
  "PT": 16.68,
  "RO": 63.05,
  "RS": 473.46,
  "RU": 14.24,
  "RW": 5.45,
  "SE": 2.64,
  "SG": 8.18,
  "SI": 3.37,
  "SK": 112.78,
  "SN": 3.37,
  "SO": 8.03,
  "SS": 19.3,
  "TD": 75.63,
  "TG": 34.84,
  "TH": 81.02,
  "TL": 9.46,
  "TN": 7.8,
  "TR": 7.08,
  "UA": 1439.02,
  "UG": 62.55,
  "US": 1.32,
  "UZ": 0.99,
  "VE": 179.55,
  "ZA": 3.09,
  "ZM": 9.82,
  "ZW": 0.06
}

	    	    
	    
	    
	    // Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create(divid, am4maps.MapChart);
var interfaceColors = new am4core.InterfaceColorSet();

try {
    chart.geodata = am4geodata_worldLow;
}
catch (e) {
    chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}


var label = chart.createChild(am4core.Label)
label.text = "12 months (3/7/2019 data) rolling measles\nincidence per 1'000'000 total population. \n Bullet size uses logarithmic scale.";
label.fontSize = 12;
label.align = "left";
label.valign = "bottom"
label.fill = am4core.color("#927459");
label.background = new am4core.RoundedRectangle()
label.background.cornerRadius(10,10,10,10);
label.padding(10,10,10,10);
label.marginLeft = 30;
label.marginBottom = 30;
label.background.strokeOpacity = 0.3;
label.background.stroke =am4core.color("#927459");
label.background.fill = am4core.color("#f9e3ce");
label.background.fillOpacity = 0.6;

var dataSource = chart.createChild(am4core.TextLink)
dataSource.text = "Data source: WHO";
dataSource.fontSize = 12;
dataSource.align = "left";
dataSource.valign = "top"
dataSource.url = "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/"
dataSource.urlTarget = "_blank";
dataSource.fill = am4core.color("#927459");
dataSource.padding(10,10,10,10);
dataSource.marginLeft = 30;
dataSource.marginTop = 30;

// Set projection
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.padding(20,20,20,20);

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();

var homeButton = new am4core.Button();
homeButton.events.on("hit", function(){
  chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#bfa58d");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
chart.deltaLongitude = 20;
chart.deltaLatitude = -20;

// limits vertical rotation
chart.adapter.add("deltaLatitude", function(delatLatitude){
    return am4core.math.fitToRange(delatLatitude, -90, 90);
})

// Create map polygon series

var shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
shadowPolygonSeries.geodata = am4geodata_continentsLow;

try {
    shadowPolygonSeries.geodata = am4geodata_continentsLow;
}
catch (e) {
    shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

shadowPolygonSeries.useGeodata = true;
shadowPolygonSeries.dx = 2;
shadowPolygonSeries.dy = 2;
shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
shadowPolygonSeries.fillOpacity = 0.1;
shadowPolygonSeries.fill = am4core.color("#000");


// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;

polygonSeries.calculateVisualCenter = true;
polygonSeries.tooltip.background.fillOpacity = 0.2;
polygonSeries.tooltip.background.cornerRadius = 20;

var template = polygonSeries.mapPolygons.template;
template.nonScalingStroke = true;
template.fill = am4core.color("#f9e3ce");
template.stroke = am4core.color("#e2c9b0");

polygonSeries.calculateVisualCenter = true;
template.propertyFields.id = "id";
template.tooltipPosition = "fixed";
template.fillOpacity = 1;

template.events.on("over", function (event) {
  if (event.target.dummyData) {
    event.target.dummyData.isHover = true;
  }
})
template.events.on("out", function (event) {
  if (event.target.dummyData) {
    event.target.dummyData.isHover = false;
  }
})

var hs = polygonSeries.mapPolygons.template.states.create("hover");
hs.properties.fillOpacity = 1;
hs.properties.fill = am4core.color("#deb7ad");


var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
graticuleSeries.fitExtent = false;
graticuleSeries.mapLines.template.strokeOpacity = 0.2;
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");


var measelsSeries = chart.series.push(new am4maps.MapPolygonSeries())
measelsSeries.tooltip.background.fillOpacity = 0;
measelsSeries.tooltip.background.cornerRadius = 20;
measelsSeries.tooltip.autoTextColor = false;
measelsSeries.tooltip.label.fill = am4core.color("#000");
measelsSeries.tooltip.dy = -5;

var measelTemplate = measelsSeries.mapPolygons.template;
measelTemplate.fill = am4core.color("#bf7569");
measelTemplate.strokeOpacity = 0;
measelTemplate.fillOpacity = 0.75;
measelTemplate.tooltipPosition = "fixed";



var hs2 = measelsSeries.mapPolygons.template.states.create("hover");
hs2.properties.fillOpacity = 1;
hs2.properties.fill = am4core.color("#86240c");

polygonSeries.events.on("inited", function () {
  polygonSeries.mapPolygons.each(function (mapPolygon) {
    var count = data[mapPolygon.id];

    if (count > 0) {
      var polygon = measelsSeries.mapPolygons.create();
      polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
      polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count;
      mapPolygon.dummyData = polygon;
      polygon.events.on("over", function () {
        mapPolygon.isHover = true;
      })
      polygon.events.on("out", function () {
        mapPolygon.isHover = false;
      })
    }
    else {
      mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
      mapPolygon.fillOpacity = 0.9;
    }

  })
})


	    }; 

    class Amchartmain extends HTMLElement {
        constructor() {
	    console.log("-------------------------------------------------");	
        console.log("constructor");
	    console.log("-------------------------------------------------");	
            super();
            shadowRoot = this.attachShadow({
                mode: "open"
            });

            shadowRoot.appendChild(template.content.cloneNode(true));

            this._firstConnection = 0;

            this.addEventListener("click", event => {
                console.log('click');
                var event = new Event("onClick");
                this.dispatchEvent(event);

            });
            this._props = {};
        }

        //Fired when the widget is added to the html DOM of the page
		connectedCallback() {
            console.log("connectedCallback");
        }

		//Fired when the widget is removed from the html DOM of the page (e.g. by hide)
		disconnectedCallback() {
			console.log("disconnectedCallback");
        }

		//When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(changedProperties) {
            console.log("onCustomWidgetBeforeUpdate");
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }

		//When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(changedProperties) {

           console.log("onCustomWidgetAfterUpdate");
           console.log(changedProperties);

	   console.log("%%%%%% INPUT %%%%%%");	

            if ("charttype" in changedProperties) {
                console.log("charttype:" + changedProperties["charttype"]);
                this.$charttype = changedProperties["charttype"];
            }

		
			if ("xvalue" in changedProperties) {
					console.log("xvalue:" + changedProperties["xvalue"]);
					this.$xvalue = changedProperties["xvalue"];

			}
				
			if ("yvalue" in changedProperties) {
					console.log("yvalue:" + changedProperties["yvalue"]);
					this.$yvalue = changedProperties["yvalue"];

			}
				

			var typeOfChart = this.$charttype;
			console.log("Type of chart : " + typeOfChart);	
			xvaluearr = this.$xvalue.split(';');
			console.log(xvaluearr);		
			yvaluearr = this.$yvalue.split(';');
			console.log(yvaluearr);	
			console.log("%%%%%% INPUT %%%%%%");	
            console.log("firsttime: " + this._firstConnection);
            var that = this;

		if (this._firstConnection === 0) {
			
		console.log("@@@@@@@@  html @@@@@@@@");	
		const div = document.createElement('div');
                let divid = changedProperties.widgetName;
                this._tagContainer = divid;
                div.innerHTML = '<div id="chartdiv"></div>';
                shadowRoot.appendChild(div);
				console.log(div);	
				const css = document.createElement('div');
				if (typeOfChart === "Sankey")
				{
					css.innerHTML = '<style>#chartdiv {margin:0 auto;width: 100%; height: 1200px;overflow:hidden;}</style>'
					console.log("@@@@@@@@ Sankey CSS  @@@@@@@@");		
				}
				else if (typeOfChart === "Map")
				{
					css.innerHTML = '<style>#chartdiv {max-width: 100%;height: 1200px;background-color:#fbebdb;}</style>'
					console.log("@@@@@@@@ Map css  @@@@@@@@");						
				}
				else				
				{
					css.innerHTML = '<style>#chartdiv {width: 100%; height: 1200px;}</style>'
					console.log("@@@@@@@@ XYChart CSS  @@@@@@@@");		
				}
		shadowRoot.appendChild(css);	
		var mapcanvas_divstr = shadowRoot.getElementById("chartdiv");	
                console.log(mapcanvas_divstr);	
		Ar.push({
                    'div': mapcanvas_divstr
                });
	
		console.log("@@@@@@@@ CSS  @@@@@@@@");
		console.log(css);
		console.log("@@@@@@@@ Shadow Root   @@@@@@@@");
		console.log(shadowRoot);
		console.log("@@@@@@@@  html @@@@@@@@");		
				async function LoadLibs() {
					try {
						await loadScript(amchartscorejs);				
						await loadScript(amchartschartsjs);				
						await loadScript(amchartsanimatedjs);
						await loadScript(amchartsmapsjs);
						await loadScript(amchartscontinentlowjs);
						await loadScript(amchartsworldlowjs);
					} catch (e) {
						alert(e);
					} finally {	
						that._firstConnection = 1;	
					}
				}
				LoadLibs();
		} else {		
				if (typeOfChart === "Sankey")
				{
					
					console.log("************Sankey chart************");    
					Sankeychartkaramba(Ar[0].div,"");
				}
				else if (typeOfChart === "Map")
				{
					console.log("************Map chart************");    
					Mapkaramba(Ar[0].div,"");	
				}	
				else
				{	
					var arraydata = [];
					for (var i = 0; i < xvaluearr.length; i++) {
						arraydata.push({
							"category": xvaluearr[i],
							"value": parseInt(yvaluearr[i])
						});
					}


					console.log("************ARRAY DATA************");    
					console.log(arraydata);
					Amchartkaramba(Ar[0].div,JSON.stringify(arraydata));
				}
		}
	
			
        }

		//When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy() {
			console.log("onCustomWidgetDestroy");
        }
    }
    customElements.define("com-karamba-amchart", Amchartmain);
})();
