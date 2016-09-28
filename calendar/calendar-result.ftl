<#assign EU_ROOT = statics.getValueProperty("widgets.url.static")>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.1/css/font-awesome.css">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script src="http://cdn.eluniversal.com/js/eu5/plugins/moment.min.js"></script>

<script  src="http://qa.static.widget.eluniversal.com/baseball/lvbp/calendar-result/result.js"> </script>
<link rel="stylesheet" href="http://qa.static.widget.eluniversal.com/baseball/lvbp/calendar-result/calendar-result.css">

<div class="calendar-result">
	<header>
		<h1>CALENDARIO Y RESULTADOS</h1>
	</header>	
	<div id="tabs" class="tabs">
		<ul class="season-tabs">
			<#list rounds as round>
				<li><a href="#tabs-${round.name?replace(" ","-")}">${round.name}</a></li>
			</#list>
		</ul>
		<#list rounds as round>
			<div id="tabs-${round.name?replace(" ","-")}">			
				<ul class="tab-results">
					<li class="workingday">JORNADA</li>
					<li class="pager">
						<ul>
							<li id="left"></li>
							<li id="date-field"></li>
							<li id="right"></li>
						</ul>		
					</li>
				</ul>
				<div id="bxslider-calendar1" class="big-screen">
					<#list round.weeks as week>
						<div class="widget-result" data-date="${week.day}" data-current="${week.current?then('true','false')}" data-index="${week?index}">
							<#list week.games as results>
								<#if (results.status == "EN VIVO") || (results.status == "FINALIZADO")>
									<a href="/pagina/relato-en-vivo?game=${results.gameId}/"> 
								</#if>
									<div class="box-result">
										<h4>
											<span>${results.date?string["hh:mm a"]}</span>
											<span>${results.date?string["dd/MM/yy"]}</span>
			
										<table border="0" cellspacing="0" cellpadding="0">
											<thead>
												<tr>
													<td id="title">EQUIPOS</td>
													<td>C</td>
													<td>H</td>
													<td>E</td>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<div class="icon">
															<i class="lvbp-${results.teamVisitor.shortName}-24"></i>
														</div>
														<span>${results.teamVisitor.shortName}</span>
													</td>
													<th>${results.teamVisitor.runsScored}</th>
													<th>${results.teamVisitor.hits}</th>
													<th>${results.teamVisitor.errors}</th>
												</tr>
												<tr>
													<td>
														<div class="icon">
															<i class="-${results.teamHome.shortName}-24"></i>
														</div>
														<span>${results.teamHome.shortName}</span>
													</td>
													<th>${results.teamHome.runsScored}</th>
													<th>${results.teamHome.hits}</th>
													<th>${results.teamHome.errors}</th>
												</tr>
											</tbody>
										</table>
										<div class="location">
											<span class="stadio">
												<#if results.park?contains(" in ")>
													${results.park?keep_before("in")}
												<#elseif results.park?contains(" of ")>
													${results.park?keep_before("of")}
												<#elseif results.park?contains(" at ")>
													${results.park?keep_before("at")}
												<#else>
													${(results.park)!"NA"}
												</#if>
											</span>
											<#if results.inning != 0>
												<span class="inn">${results.inning}${apiutil.getOrdinalNumber(results.inning)}<i class="fa fa-angle-<#if results.inningTop == 0>down<#else>up</#if>"></i>
												</span>
											</#if>
										</div>
										<div class="pitchers">
											<ul>
												<li>${results.pitcherWin}</li>
												<li>${results.pitcherLoss}</li>
												<li>${results.pitcherSave}</li>
											</ul>
										</div>
										<div class="status">
											<p><b>${(results.status)!"-"}</b></p>
										</div>
									</div>
								<#if (results.status == "EN VIVO") || (results.status == "FINALIZADO")>
									</a>
								</#if>
							</#list>	
						</div>
					</#list>
					
				</div>
				<div id="bxslider-calendar1" class="movil">
					<#list round.weeks as week>
						<div class="widget-result" data-date="${week.day}" data-current="${week.current?then('true','false')}" data-index="${week?index}">
							<#list week.games as results>
								<a href="/mlb/juegos/${results.gameId}/">
									<div class="box-result">
										<h4>
											<span>${results.date?string["hh:mm a"]}</span>
											<span>${results.date?string["dd/MM/yy"]}</span>
										</h4>
										<table border="0" cellspacing="0" cellpadding="0">
											<thead>
												<tr>
													<td id="title">EQUIPOS</td>
													<td>C</td>
													<td>H</td>
													<td>E</td>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<div class="icon">
															<i class="lvbp-${results.teamVisitor.shortName}-24"></i>
														</div>
														<span>${results.teamVisitor.shortName}</span>
													</td>
													<th>${results.teamVisitor.runsScored}</th>
													<th>${results.teamVisitor.hits}</th>
													<th>${results.teamVisitor.errors}</th>
												</tr>
												<tr>
													<td>
														<div class="icon"> 
															<i class="lvbp-${results.teamHome.shortName}-24"></i>
														</div>
														<span>${results.teamHome.shortName}</span>
													</td>
													<th>${results.teamHome.runsScored}</th>
													<th>${results.teamHome.hits}</th>
													<th>${results.teamHome.errors}</th>
												</tr>
											</tbody>
										</table>
										<div class="location">
											<span class="stadio">
												<#if results.park?contains(" in ")>
													${results.park?keep_before("in")}
												<#elseif results.park?contains(" of ")>
													${results.park?keep_before("of")}
												<#elseif results.park?contains(" at ")>
													${results.park?keep_before("at")}
												<#else>
													${(results.park)!"NA"}
												</#if>
											</span>
											<#if results.inning != 0>
												<span class="inn">${results.inning}${apiutil.getOrdinalNumber(results.inning)}<i class="icons-chevron-<#if results.inningTop == 0>down<#else>up</#if>"></i>
												</span>
											</#if>
										</div>
										<div class="pitchers">
											<ul>
												<li>${results.pitcherWin}</li>
												<li>${results.pitcherLoss}</li>
												<li>${results.pitcherSave}</li>
											</ul>
										</div>
										<div class="status">
											<p><b>${(results.status)!"-"}</b></p>
										</div>
									</div>
								</a>
							</#list>	
						</div>
					</#list>
					</a>
				</div>
			</div>
		</#list>
	</div>
</div>