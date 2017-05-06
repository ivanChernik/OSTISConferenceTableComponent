/**
 *  ConferenceApplicationTable Paint panel.
 */



function appendLinkContent(item_sc_addr, nrel_norole_relation_addr, datarow) {
    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
        item_sc_addr,
        sc_type_arc_common | sc_type_const,
        sc_type_link,
        sc_type_arc_pos_const_perm,
        nrel_norole_relation_addr
    ]).done(function (link) {
        window.sctpClient.get_link_content(link[0][2], 'string').done(function (linkContent) {
            datarow.push(`${linkContent}`);
            console.log(datarow);
        });
    });
}

ConferenceApplicationTable.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

ConferenceApplicationTable.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        $.ajax({
            url: "static/components/html/conference_application_table/conference_application_table.html",
            dataType: 'html',
            success: function (response) {

                var dataSet = [];
                container.append(response);
                $("#conference-year").on('change', function () {

                    dataSet = [];

                    if ($(".dataTable").length) {
                        $('#application-table').dataTable().fnDestroy();
                        $('#application-table').empty();
                    }

                    var conferenceYear = $("#conference-year").val();
                   
                    new Promise(function (resolve, reject) {

                        var application_to_OSTIS_20XX_addr, nrel_application_addr;
                        var nrel_participation_form_addr, nrel_name_of_article_addr;
                        var nrel_application_date_addr, nrel_conference_competition_addr;
                        var nrel_speaker_addr;


                        var applicationOstis20xxAddr = [];
                        var applicationIdtf = [];
                        var studentProjectsAddrs = [],
                            projects_identifiers = [];

                        var systemIndf = ['application_to_OSTIS_' + conferenceYear,
                            'nrel_application',
                            'nrel_participation_form', 'nrel_name_of_article',
                            'nrel_application_date', 'nrel_conference_competition',
                            'nrel_speaker'
                        ];

                        SCWeb.core.Server.resolveScAddr(systemIndf, function (keynodes) {
                            application_to_OSTIS_20XX_addr = keynodes['application_to_OSTIS_' + conferenceYear];

                            if (!application_to_OSTIS_20XX_addr) {
                                dataSet = [];
                                 resolve();
                                return false;
                            }

                            nrel_application_addr = keynodes['nrel_application'];
                            nrel_participation_form_addr = keynodes['nrel_participation_form'];
                            nrel_name_of_article_addr = keynodes['nrel_name_of_article'];
                            nrel_application_date_addr = keynodes['nrel_application_date'];
                            nrel_conference_competition_addr = keynodes['nrel_conference_competition'];
                            nrel_speaker_addr = keynodes['nrel_speaker'];
       
                            window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
                                application_to_OSTIS_20XX_addr,
                                sc_type_arc_pos_const_perm,
                                sc_type_node
                            ]).done(function (identifiers) {
                                identifiers.forEach((item) => {
                                    applicationOstis20xxAddr.push(item[2]);
                            });

                                SCWeb.core.Server.resolveIdentifiers(applicationOstis20xxAddr, function (idf) {
                        
		                                    $.each(idf, function (index, value) {
		                                        applicationIdtf.push({
		                                            'sc_addr': index,
		                                            "idtf": value
		                                        });
		                                    });


		                                    applicationIdtf.forEach((item) => {

		                                    var item_sc_addr = item["sc_addr"];

		                                    var datarow = [];

		                                    dataSet.push(datarow);

		                                    datarow.push(`<a sc_addr="${item_sc_addr}" href="#">${item["idtf"]}</a>`);

		                                     appendLinkContent(item_sc_addr, nrel_participation_form_addr, datarow);
		                                     appendLinkContent(item_sc_addr, nrel_name_of_article_addr, datarow);
		                                     appendLinkContent(item_sc_addr, nrel_application_date_addr, datarow);
		                                     appendLinkContent(item_sc_addr, nrel_conference_competition_addr, datarow);
		                                     appendLinkContent(item_sc_addr, nrel_speaker_addr, datarow);
		                                     
		                                    //creator of application
		                                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
		                                        item_sc_addr,
		                                        sc_type_arc_common | sc_type_const,
		                                        sc_type_node,
		                                        sc_type_arc_pos_const_perm,
		                                        nrel_application_addr
		                                    ]).done(function (applicationCreator) {
		                                        window.scHelper.getIdentifier(applicationCreator[0][2], scKeynodes.lang_ru).done(function (idtf) {
		                                            datarow.push(`<a href="#" sc_addr="${applicationCreator[0][2]}">${idtf}</a></td>`);
		                                        })
		                                    });


		                                });
									
									setTimeout(() => {
			                         resolve();
			                         }, applicationIdtf.length * 100);
															
                                });
                            });
                        });
                    }).then(response => {
                    
                    console.log(dataSet);
                    $('#application-table').DataTable({
                        "bDestroy": true,
                        data: dataSet,
                            columns: [{
                                title: "Название заявки"
                            },
                            {
                                title: "Форма участия"
                            },
                            {
                                title: "Название статьи"
                            },
                            {
                                title: "Дата подачи"
                            },
                            {
                                title: "Конкурс конференции"
                            },
                            {
                                title: "Докладчик"
                            },
                            {
                                title: "Создатель заявки"
                            }
                        ]
                    });

                })
                    ;

                });

            },
            error: function () {
                console.log("Error to get html file for conference apps");
            }
        });

    }
};