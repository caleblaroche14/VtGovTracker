from town import Town

def main():

    # Franklin
    franklin = Town('Franklin', 'https://www.franklinvermont.org/boards-commissions-departments/selectboard')
    franklin.update_data_sources()
    franklin.get_new_data()
    #franklin.upload_meetings()

    # Highgate
    highgate = Town('Highgate', 'https://www.highgatevt.org/notices-meetings-agendas')
    highgate.update_data_sources()
    highgate.get_new_data()
    #highgate.upload_meetings()

main()