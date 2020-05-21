(function() {
    let shadowRoot;

    var Ar = [];
    var ArChartGauge = [];
    var xvaluearr = [];	
    var yvaluearr = [];	
    var mapcanvas_divstr = "";	

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
                css.innerHTML = '<style>#chartdiv {width: 100%; height: 500px;}</style>'
                shadowRoot.appendChild(css);
		console.log("@@@@@@@@   @@@@@@@@");		
		var mapcanvas_divstr = shadowRoot.getElementById("chartdiv");
			
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
						await loadScript(googlesheetsjs);
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

		//When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy() {
			console.log("onCustomWidgetDestroy");
        }
    }
    customElements.define("com-karamba-amchart", Amchartmain);
})();
