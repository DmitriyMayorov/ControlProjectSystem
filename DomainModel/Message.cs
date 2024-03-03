using System;
using System.Collections.Generic;

namespace DomainModel;

public partial class Message
{
    public int Id { get; set; }

    public string TextMessage { get; set; } = null!;

    public DateOnly DateMessage { get; set; }

    public int Idtask { get; set; }

    public int Idworker { get; set; }

    public virtual Task IdtaskNavigation { get; set; } = null!;

    public virtual Worker IdworkerNavigation { get; set; } = null!;
}
