from town import Town

def main():

    # Franklin
    franklin = Town(1,'Franklin', 'https://www.franklinvermont.org/boards-commissions-departments/selectboard')
    franklin.update_data_sources()
    franklin.get_new_data()

    # Highgate
    highgate = Town(2,'Highgate', 'https://www.highgatevt.org/notices-meetings-agendas')
    highgate.update_data_sources()
    highgate.get_new_data()

main()