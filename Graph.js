function Graph()
{
	//	basic properties
	this.n			= 0;	// number of vertices
	this.edgesl		= [];	// left indices of edges
	this.edgesr		= [];	// right indices of edges
	
	//	redundant properties, can be computed from basic properties
	this.neibs		= [];	// neighbours of each vertex (array of arrays)
	this.comps		= [];	// components of graph (array of arrays), each vertex belongs to one component
}

Graph.prototype.Build = function (s)
{	
	var re = /^[0-9]+:(|([0-9]+-[0-9]+)(|,[0-9]+-[0-9]+)*)$/g
	if(!re.test(s)) {alert("Wrong graph code!"); return;}
	
	var sp = s.split(":");
	var n = Number( sp[0] );
	
	this.MakeEmpty(n);
	
	var ed = sp[1].split(",");
	if(ed[0].length == 0) return;	// no edges
	
	var a, b, e;
	for(var i=0; i<ed.length; i++)
	{
		e = ed[i].split("-");
		a = Number(e[0])-1;
		b = Number(e[1])-1;
		if(a >= this.n || b >= this.n) {alert("Wrong edge number!"); return;}
		this.AddEdge(a, b);
	}
}

Graph.prototype.GetComp = function(k)	// returns index of component containing k. vertex
{
	for(var i=0; i<this.comps.length; i++) if(this.comps[i].indexOf(k) > -1) return i;
	return -1;
}

Graph.prototype.MakeEmpty = function(n)
{
	this.n = n;
	this.edgesl = [];
	this.edgesr = [];
	this.neibs	= [];
	this.comps	= [];
	
	for(var i=0; i<n; i++) { this.neibs.push([]); this.comps.push([i]);}
}

Graph.prototype.AddEdge = function(a, b)
{
	this.edgesl.push(a);
	this.edgesr.push(b);
	this.neibs[a].push(b);
	this.neibs[b].push(a);
	
	var ca = this.GetComp(a);
	var cb = this.GetComp(b);
	var cs = this.comps;
	if(ca != cb)
	{
		cs[ca] = cs[ca].concat(cs[cb]);
		cs.splice(cb, 1);
	}
}


function Vertex (x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
	this.f = new Point(0, 0, 0);
	this.v = new Point(0, 0, 0);
	
	this.px = 0;
	this.py = 0;
}

function Point(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}
Point.prototype.distance2D = function(a, b)
{
   return(Math.sqrt( (b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y)));
}
