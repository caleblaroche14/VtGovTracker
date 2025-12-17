from town import Town
import time

def main():

    # Franklin
    franklin = Town(1,'Franklin', 'https://www.franklinvermont.org/boards-commissions-departments/selectboard')
    franklin.update_data_sources()
    franklin.get_new_data()

    # Highgate
    highgate = Town(2,'Highgate', 'https://www.highgatevt.org/notices-meetings-agendas')
    highgate.update_data_sources()

    # run until town.needsUpdate is False
    while highgate.needsUpdate:
        print('Updating data for Highgate...')
        highgate.get_new_data()

        # sleep for 10 seconds to avoid rate limiting
        print("Waiting 10 seconds before next update...")
        time.sleep(10)
        
main()