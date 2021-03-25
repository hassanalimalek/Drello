
import { format} from 'date-fns'

export default async function overDueMail (taskContent,taskDate,taskListType) {
    console.log("Sending over due Email !!!!")
    let  dateString = format(new Date(taskDate), '	h:m a do LLLL YYY')
  
    const message =   `Your Task '${taskContent}' was supposed to be completed by ${dateString}. \n Kindly Change the Due Date or Remove it from your ${taskListType} list.`;
  
    var data = {
        service_id: 'Drello Team',
        template_id: 'template_ajdo9tl',
        user_id: 'user_LbJ4wshv97ikN1LDgiMVH',
        template_params: {
        from_name: 'Drello Team',
        to_name: 'User',
        subject: 'Task Over Due',
        message_html: message}
    }
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
 

}

  