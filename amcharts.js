(function() {
    let shadowRoot;

    var Ar = [];
    var xvaluearr = [];	
    var yvaluearr = [];	
	var	typeOfChart = "XYChart";


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
				

			typeOfChart = this.$charttype;
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
				
				if (typeOfChart === "Sankey")
				{
					const css = document.createElement('div');
					css.innerHTML = '<style>#chartdiv {margin:0 auto;width: 100%; height: 800px;overflow:hidden;}</style>'
					shadowRoot.appendChild(css);
					console.log("@@@@@@@@   @@@@@@@@");		
					var mapcanvas_divstr = shadowRoot.getElementById("chartdiv");
				}
				else				
				{
					const css = document.createElement('div');
					css.innerHTML = '<style>#chartdiv {width: 100%; height: 500px;}</style>'
					shadowRoot.appendChild(css);
					console.log("@@@@@@@@   @@@@@@@@");		
					var mapcanvas_divstr = shadowRoot.getElementById("chartdiv");
				}
                console.log(mapcanvas_divstr);	
		Ar.push({
                    'div': mapcanvas_divstr
                });
	
		console.log("@@@@@@@@   @@@@@@@@");
		console.log(css);
		console.log("@@@@@@@@   @@@@@@@@");
		console.log(shadowRoot);
		console.log("@@@@@@@@  html @@@@@@@@");		
				async function LoadLibs() {
					try {
						await loadScript(amchartscorejs);				
						await loadScript(amchartschartsjs);				
						await loadScript(amchartsanimatedjs);
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
